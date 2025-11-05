<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/translations';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCalendar from 'svelte-icons-pack/ai/AiOutlineCalendar';
	import LocationPin from 'svelte-icons-pack/hi/HiOutlineLocationMarker';

	export let data: PageData;
	let events = data.events;
	let upcomingEvents = events.filter((event) => new Date(event.start.local) > new Date());
</script>

<h1>{@html $t('events.heading')}</h1>
<p>
	{@html $t('events.paragraph1')}
</p>

{#if upcomingEvents.length > 0}
	<ul>
		{#each upcomingEvents as event}
			<li>
				<div class="event-block">
					<a class="card-link" href={event.url} target="_blank" rel="noopener noreferrer">
						<img alt="" src={event.logo?.original?.url ?? 'default.jpg'} /></a
					>
					<div class="event-layout">
						<a class="card-link" href={event.url} target="_blank" rel="noopener noreferrer">
							<h2>{event.name.text}</h2>
							<p>{event.description.text}</p>
						</a>

						<div class="info-block">
							<time>
								<Icon src={AiOutlineCalendar} />
								{new Date(event.start.local).toLocaleDateString([], {
									day: '2-digit',
									month: 'short'
								})}
								{new Date(event.start.local).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit'
								})}
							</time>
							<span title={event.venue?.address.localized_address_display}
								><Icon src={LocationPin} /><a
									class="maps-link"
									href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue?.address.localized_address_display ?? '')}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									{event.venue?.name ?? 'Event venue unknown'}</a
								></span
							>
						</div>
					</div>
				</div>
				<hr />
			</li>
		{/each}
	</ul>
{:else}
	<p>
		{@html $t('events.no_events')}
	</p>
{/if}

<style>
	ul {
		padding: 0;
	}

	li {
		list-style-type: none;
	}

	h2 {
		margin-bottom: 0;
	}

	.event-block {
		background-color: #fcf6d2;
		padding: 1rem;
		transition: filter 0.3s ease;
		transition: scale 0.3s ease;
	}

	.event-block:hover {
		filter: drop-shadow(10px 10px 20px rgba(36, 36, 36, 0.5));
		scale: 102%;
	}

	hr {
		border: none;
		border-top: 1px dashed #fcf6d2;
		margin: 1em 0;
	}

	.info-block {
		margin-top: 1rem;
		margin-left: 1rem;
		font-weight: bold;
		background-color: #a6d2d5;
		padding: 0.3rem;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		min-width: 165px;
		max-height: 3rem;
	}

	img {
		filter: drop-shadow(4px 4px 4px #c1c1c1);
	}

	.maps-link {
		color: #393939;
	}

	.event-layout {
		display: flex;
		flex-direction: row;
	}

	.card-link {
		text-decoration: none;
		color: inherit;
	}

	@media (max-width: 600px) {
		.event-layout {
			flex-direction: column-reverse;
		}

		.info-block {
			margin-left: 0;
		}

		.event-block:hover {
			filter: unset;
			scale: unset;
		}
	}
</style>
