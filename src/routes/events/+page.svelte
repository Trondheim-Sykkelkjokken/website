<script lang="ts">
	import { t, locale } from '$lib/translations';
	import { page } from '$app/stores';
	import { pickText } from '$lib/utils/events';
	import type { EventOccurrence } from '$lib/utils/events';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCalendar from 'svelte-icons-pack/ai/AiOutlineCalendar';
	import LocationPin from 'svelte-icons-pack/ai/AiOutlineEnvironment';
	import FacebookIcon from 'svelte-icons-pack/ai/AiOutlineFacebook';

	export let data: { events: EventOccurrence[] };

	const feedPath = '/events/calendar.ics';
	// webcal:// makes calendar apps subscribe (and keep refreshing) rather than
	// download a one-time snapshot.
	$: subscribeHref = `webcal://${$page.url.host}${feedPath}`;

	const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

	// English uses a 12-hour clock ("5 PM", "8:30 PM"); Norwegian uses 24-hour.
	function time12(t: string): string {
		const [h, m] = t.split(':').map(Number);
		return new Date(2000, 0, 1, h, m).toLocaleTimeString('en', {
			hour: 'numeric',
			minute: m ? '2-digit' : undefined,
			hour12: true
		});
	}

	function enTimeRange(start: string, end: string): string {
		const s = time12(start);
		const e = time12(end);
		// share the meridiem when both ends are AM or both PM: "5–8 PM"
		return s.slice(-2) === e.slice(-2) ? `${s.slice(0, -3)}–${e}` : `${s}–${e}`;
	}

	function timeLabel(start: string, end: string | undefined, locale: string): string {
		if (locale === 'en') {
			return end ? enTimeRange(start, end) : time12(start);
		}
		// Norwegian: 24-hour, compact when both ends are on the hour ("17–20").
		if (!end) return start.endsWith(':00') ? String(Number(start.slice(0, 2))) : start;
		if (start.endsWith(':00') && end.endsWith(':00')) {
			return `${Number(start.slice(0, 2))}–${Number(end.slice(0, 2))}`;
		}
		return `${start}–${end}`;
	}

	// Resolve localized text here (not in helper functions) so the expressions
	// depend on $t and $locale directly and re-run when the language switches.
	$: cards = data.events.map((event) => {
		return {
			...event,
			title: pickText(event.title, $locale),
			description: pickText(event.description, $locale),
			dateLabel: capitalize(
				new Date(`${event.date}T00:00:00`).toLocaleDateString($locale, {
					weekday: 'short',
					day: 'numeric',
					month: 'short'
				})
			),
			timeLabel: timeLabel(event.start_time, event.end_time, $locale),
			mapsHref: event.location
				? event.map_url ||
					`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
				: ''
		};
	});
</script>

<h1>{@html $t('events.heading')}</h1>
<p>{@html $t('events.paragraph1')}</p>

<p class="calendar-cta">
	{$t('events.calendar_intro')}
	<a class="info-link" href={subscribeHref}>
		<Icon src={AiOutlineCalendar} />
		{$t('events.calendar_subscribe')}
	</a>
	<a class="info-link" href={feedPath} download="sykkelkjokken.ics"
		>{$t('events.calendar_download')}</a
	>
</p>

{#if cards.length > 0}
	<ul>
		{#each cards as card (card.id)}
			<li>
				<div class="event-block">
					<div class="event-body">
						<h2>{card.title}</h2>
						<p>{card.description}</p>
					</div>

					<div class="info-block">
						<time>
							<Icon src={AiOutlineCalendar} />
							{card.dateLabel} {card.timeLabel}
						</time>
						{#if card.location}
							<a
								class="info-link"
								href={card.mapsHref}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon src={LocationPin} />
								{card.location}
							</a>
						{/if}
						{#if card.facebook_url}
							<a
								class="info-link"
								href={card.facebook_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon src={FacebookIcon} />
								{$t('events.view_on_facebook')}
							</a>
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>{@html $t('events.no_events')}</p>
{/if}

<style>
	ul {
		padding: 0;
	}

	li {
		list-style-type: none;
		margin-bottom: 1rem;
	}
	li:last-child {
		margin-bottom: 0;
	}

	h2 {
		margin-bottom: 0;
	}

	.event-block {
		background-color: #fcf6d2;
		padding: 1rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.event-body {
		flex: 1;
	}

	.info-block {
		margin-top: 1rem;
		margin-left: 1rem;
		font-weight: bold;
		background-color: #a6d2d5;
		padding: 0.5rem;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		min-width: 200px;
		height: fit-content;
	}

	.info-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: #393939;
		text-decoration: underline;
	}

	.calendar-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.3rem 1rem;
	}

	@media (max-width: 600px) {
		.event-block {
			flex-direction: column-reverse;
		}

		.info-block {
			margin-left: 0;
		}
	}
</style>
