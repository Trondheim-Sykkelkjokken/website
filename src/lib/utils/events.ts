// Events for the website are generated from a small config (src/config/events.json)
// instead of pulled from an external service. Recurring events (the weekly
// workshop, the monthly hangout) are stored as rules and expanded into concrete
// dates here. One-off events are listed explicitly. All events run only within
// the shared season ranges (the current term).

export type Locale = 'en' | 'nb' | 'nn';
export type LocalizedText = Partial<Record<Locale, string>>;

export interface Season {
	start: string; // inclusive "YYYY-MM-DD"
	end: string;
}

// "weekly" = every `weekday`; "monthly-first" = first `weekday` of each month.
export type Frequency = 'weekly' | 'monthly-first';

export interface RecurringRule {
	id: string; // stable slug, used in occurrence ids
	frequency: Frequency;
	weekday: number; // 0 = Sunday ... 3 = Wednesday
	start_time: string; // "HH:MM"
	end_time?: string; // omit for open-ended events
	location?: string; // omit when there is no fixed place
	map_url?: string;
	facebook_url?: string;
	skip?: string[]; // cancelled dates, "YYYY-MM-DD"
	title: LocalizedText;
	description: LocalizedText;
}

export interface SpecialConfig {
	date: string; // "YYYY-MM-DD"
	start_time: string;
	end_time?: string;
	location?: string;
	map_url?: string;
	facebook_url?: string;
	title: LocalizedText;
	description: LocalizedText;
}

export interface EventsConfig {
	seasons: Season[];
	recurring: RecurringRule[];
	special: SpecialConfig[];
}

// A single dated occurrence, ready to render.
export interface EventOccurrence {
	id: string;
	date: string; // "YYYY-MM-DD"
	start_time: string; // "HH:MM"
	end_time?: string;
	location?: string;
	map_url?: string;
	facebook_url?: string;
	title: LocalizedText;
	description: LocalizedText;
}

// Day of week for a "YYYY-MM-DD" string, computed in UTC to avoid the server's
// timezone shifting the date.
function weekdayOf(date: string): number {
	const [y, m, d] = date.split('-').map(Number);
	return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function addDays(date: string, days: number): string {
	const [y, m, d] = date.split('-').map(Number);
	const next = new Date(Date.UTC(y, m - 1, d + days));
	return next.toISOString().slice(0, 10);
}

// First `weekday` on or after `from`.
function firstWeekday(from: string, weekday: number, notAfter: string): string {
	let cursor = from;
	while (weekdayOf(cursor) !== weekday && cursor <= notAfter) {
		cursor = addDays(cursor, 1);
	}
	return cursor;
}

// Every weekly date within a season, on the configured weekday. Skips and the
// "today" cutoff are applied by the caller.
function weeklyDates(season: Season, weekday: number): string[] {
	let cursor = firstWeekday(season.start, weekday, season.end);
	const dates: string[] = [];
	while (cursor <= season.end) {
		dates.push(cursor);
		cursor = addDays(cursor, 7);
	}
	return dates;
}

// The first `weekday` of each month that a season touches, within the season.
function monthlyFirstDates(season: Season, weekday: number): string[] {
	const dates: string[] = [];
	let year = Number(season.start.slice(0, 4));
	let month = Number(season.start.slice(5, 7)); // 1-12
	while (true) {
		const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
		if (monthStart > season.end) break;
		const first = firstWeekday(monthStart, weekday, season.end);
		if (first >= season.start && first <= season.end) dates.push(first);
		month++;
		if (month > 12) {
			month = 1;
			year++;
		}
	}
	return dates;
}

function ruleDates(rule: RecurringRule, seasons: Season[]): string[] {
	const expand = rule.frequency === 'monthly-first' ? monthlyFirstDates : weeklyDates;
	return seasons.flatMap((s) => expand(s, rule.weekday));
}

/**
 * Build the upcoming events list from config.
 * @param today  "YYYY-MM-DD" — occurrences before this are dropped.
 * @param limit  max occurrences to return, counted chronologically across all
 *               rules and specials. Omit to return everything (used by the feed).
 */
export function getUpcomingEvents(
	config: EventsConfig,
	today: string,
	limit?: number
): EventOccurrence[] {
	const occurrences: EventOccurrence[] = [];

	for (const rule of config.recurring) {
		const skip = new Set(rule.skip ?? []);
		const dates = ruleDates(rule, config.seasons).filter(
			(date) => date >= today && !skip.has(date)
		);
		for (const date of dates) {
			occurrences.push({
				id: `${rule.id}-${date}`,
				date,
				start_time: rule.start_time,
				end_time: rule.end_time || undefined,
				location: rule.location || undefined,
				map_url: rule.map_url || undefined,
				facebook_url: rule.facebook_url || undefined,
				title: rule.title,
				description: rule.description
			});
		}
	}

	for (const s of config.special) {
		if (s.date < today) continue;
		occurrences.push({
			id: `special-${s.date}`,
			date: s.date,
			start_time: s.start_time,
			end_time: s.end_time || undefined,
			location: s.location || undefined,
			map_url: s.map_url || undefined,
			facebook_url: s.facebook_url || undefined,
			title: s.title,
			description: s.description
		});
	}

	occurrences.sort((a, b) =>
		a.date === b.date ? a.start_time.localeCompare(b.start_time) : a.date.localeCompare(b.date)
	);
	return limit === undefined ? occurrences : occurrences.slice(0, limit);
}

// Pick localized text with a fallback order, so a special event filled in only
// in one language still shows something.
export function pickText(text: LocalizedText | null, locale: string): string {
	if (!text) return '';
	const order = [locale, 'nb', 'en', 'nn'] as const;
	for (const l of order) {
		const value = text[l as Locale];
		if (value) return value;
	}
	return '';
}

// An occurrence plus the localized text to show in the calendar entry.
export interface CalendarItem {
	event: EventOccurrence;
	summary: string;
	description: string;
}

// Escape the characters ICS gives special meaning (RFC 5545 §3.3.11).
function escapeICS(text: string): string {
	return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

// Build a full VCALENDAR from occurrences, using floating local time (no
// timezone), which calendar apps read as the viewer's local time — fine for a
// local event. Served as a feed so subscribers pick up config changes.
export function buildCalendar(items: CalendarItem[]): string {
	const dt = (date: string, time: string) => `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
	const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//sykkelkjokken.no//events//EN'];
	for (const { event, summary, description } of items) {
		lines.push(
			'BEGIN:VEVENT',
			`UID:${event.id}@sykkelkjokken.no`,
			`DTSTART:${dt(event.date, event.start_time)}`,
			// open-ended events get a nominal 2h duration so clients render them
			event.end_time ? `DTEND:${dt(event.date, event.end_time)}` : 'DURATION:PT2H',
			`SUMMARY:${escapeICS(summary)}`,
			`DESCRIPTION:${escapeICS(description)}`
		);
		if (event.location) lines.push(`LOCATION:${escapeICS(event.location)}`);
		lines.push('END:VEVENT');
	}
	lines.push('END:VCALENDAR');
	return lines.join('\r\n');
}
