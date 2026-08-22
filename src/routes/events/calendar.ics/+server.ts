import eventsConfig from '../../../config/events.json';
import { buildCalendar, getUpcomingEvents, pickText, type EventsConfig } from '$lib/utils/events';

import type { RequestHandler } from './$types';

// Calendar feed of all upcoming events (recurring + specials). Served fresh per
// request so subscribers pick up config changes (season end dates, skips, new
// specials). Text is Norwegian for now.
export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().slice(0, 10);
	const events = getUpcomingEvents(eventsConfig as EventsConfig, today);

	const items = events.map((event) => ({
		event,
		summary: pickText(event.title, 'nb'),
		description: pickText(event.description, 'nb')
	}));

	return new Response(buildCalendar(items), {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'inline; filename="sykkelkjokken.ics"',
			// let calendar apps re-poll without hammering the function
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
