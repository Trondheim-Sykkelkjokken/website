<script>
	/** @type {import('./$types').PageData} */
	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineCalendar from 'svelte-icons-pack/ai/AiOutlineCalendar';
	import LocationPin from 'svelte-icons-pack/hi/HiOutlineLocationMarker';

	export let data;
	let events = data.events;
	let upcomingEvents = events.filter((event) => new Date(event.start.local) > new Date());
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
					<div class="header-block">
						<h2>{event.name.text}</h2>
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
									href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue?.address.localized_address_display)}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									{event.venue?.name ?? 'Event venue unknown'}</a
								></span
							>
						</div>
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

	.event-block {
		background-color: #fcf6d2;
		padding: 1rem;
	}

	hr {
		border: none;
		border-top: 1px dashed #fcf6d2;
		margin: 1em 0;
	}

	.header-block {
		width: 100%;
		display: flex;
		justify-content: space-between;
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

	@media (max-width: 420px) {
		.header-block {
			flex-direction: column;
		}

		.info-block {
			margin-left: 0;
		}
	}
</style>
