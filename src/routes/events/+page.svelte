<script lang="ts">
	import AiOutlineCalendar from 'svelte-icons-pack/ai/AiOutlineCalendar';
	import LocationPin from 'svelte-icons-pack/hi/HiOutlineLocationMarker';
	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import type { BikeKitchenEvent } from '$lib/types/events.type';

	/** @type {import('./$types').PageData} */
	export let data;
	let events: BikeKitchenEvent[] = data.events;
	let upcomingEvents: BikeKitchenEvent[] = events.filter(
		(event) => new Date(event.start.local) > new Date()
	);
</script>

<h1>Events</h1>
<p>
	You can also find upcoming events on our <a
		href="https://www.facebook.com/trondheimsykkelkjokken/events">Facebook page</a
	>.
</p>

{#if upcomingEvents.length > 0}
	<ul>
		{#each upcomingEvents as event}
			<li>
				<div class="event-block">
					<img alt="" src={event.logo?.original?.url ?? 'default.jpg'} />
					<div>
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
					</div>
					<h2>{event.name.text}</h2>
					<div class="info-block">
						<!-- <span><Icon src={LocationPin} />location goes here</span> -->
					</div>
					<p>{event.description.text}</p>
				</div>
				<hr />
			</li>
		{/each}
	</ul>
{:else}
	<p>
		No upcoming events. Send us a mail with suggestions at <a
			href="mailto:<kontakt@sykkelkjokken.no">kontakt@sykkelkjokken.no</a
		>
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

	time {
		margin-top: 1rem;
		font-weight: bold;
		float: right;
		background-color: #a6d2d5;
		padding: 0.3rem;
		border-radius: 5px;
	}

	.event-block {
		background-color: #fcf6d2;
		padding: 1rem;
	}

	hr {
		border: none;
		border-top: 1px dashed #fcf6d2; /* Adjust color and width as needed */
		margin: 1em 0;
	}

	.info-block {
		display: flex;
		flex-direction: column;
	}

	img {
		filter: drop-shadow(4px 4px 4px #c1c1c1);
	}
</style>
