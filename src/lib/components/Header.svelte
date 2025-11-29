<script lang="ts">
	import AiOutlineMenu from 'svelte-icons-pack/ai/AiOutlineMenu';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import NavLink from './NavLink.svelte';
	import LangButton from './LangButton.svelte';
	import BikesFixedCounter from '$lib/components/BikesFixedCounter.svelte';

	import { navOpen, setNavOpen } from '../../stores';
	import { t } from '$lib/translations';

	let open: boolean;
	navOpen.subscribe((value) => {
		open = value;
	});

	export let message: string;
</script>

{#if open}
	<div class="nav-overlay" on:click={() => setNavOpen(false)}></div>
{/if}

<header>
	<!-- Our logo -->
	<div class="cog-wrapper"><a href="/"><img class="cog" alt="" src="/logo.svg" /></a></div>

	<!-- The first row of the header, with our name and the language switcher -->
	<div class="heading-wrapper">
		<div class="heading-banner">
			<a href="/" class="heading-link"><img class="heading" src="/title.png" alt="" /></a>
			<button on:click={() => setNavOpen(!open)}>
				<Icon color="black" src={AiOutlineMenu} />
			</button>
			<div class="i18n-heading-wrapper">
				<LangButton />
			</div>
		</div>
	</div>

	<!-- The second row of the header, with the navigation -->
	<div id="nav-wrapper">
		<nav class:hidden={!open}>
			<NavLink title={$t('layout.home')} href="/" />
			<NavLink title={$t('layout.events')} href="/events" />
			<NavLink title={$t('layout.membership')} href="/membership" />
			<!-- <NavLink title={$t('layout.blog')} href="/blog" /> -->
			<NavLink title={$t('layout.volunteer')} href="/volunteer" />
			<NavLink title={$t('layout.tools')} href="/tools" />
			<!-- <NavLink title={$t('layout.resources')} href="/resources" /> -->
			<div class="i18n-menu-wrapper">
				<LangButton />
			</div>
		</nav>
	</div>

	<!-- The third row of the header, with the opening hours -->
	<div class="info">
		<p class="infotext">{message}</p>
	</div>

	<!-- The "fixed bikes" badge -->
	<div class="fixed-bikes-badge">
		<BikesFixedCounter />
	</div>

</header>

<style>
	/* Invisible fullscreen overlay behind mobile nav menu - clicking it closes the menu */
	.nav-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9; /* Below nav (z-index 10) but above page content */
	}

	.heading-wrapper {
		background-color: white;
	}

	.heading-banner {
		background-color: white;
		width: 100%;
		display: flex;
		flex-direction: row;
		max-width: 1052px;
		margin: 0 auto;
		align-items: center;
	}

	.heading {
		height: 5rem;
		max-height: 4rem;
		width: auto;
		height: auto;
		margin: 0 auto;
	}

	.heading-link {
		display: inline-block;
		max-width: 80%;
		max-height: 4rem;
		margin: 0 auto;
		padding-left: 3rem;
	}

	#nav-wrapper {
		background-color: #efeb92;
		z-index: 10;  /* above the badge */
	}

	nav {
		padding: 0.5rem 0 0.5rem 15rem;
		min-height: 3rem;
		margin: auto;
		max-width: 800px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: center;
		justify-content: space-between;
	}

	button {
		font-size: 1.5rem;
		margin-bottom: -1rem;
		border: 0;
		background-color: transparent;
		display: none;
		cursor: pointer;
	}

	.i18n-menu-wrapper {
		margin-top: 1rem;
		margin-left: -1rem;
		display: none;
	}

	@media (max-width: 720px) {
		#nav-wrapper {
			position: absolute;
			width: 100%;
		}

		.heading-link {
			padding-left: 0;
		}

		nav {
			flex-direction: column;
			padding-left: 0;
			align-content: baseline;
			padding-left: 1rem;
		}

		button {
			display: inline-block;
		}

		nav.hidden {
			display: none;
		}

		.cog-wrapper {
			display: none;
		}

		.i18n-heading-wrapper {
			display: none;
		}

		.i18n-menu-wrapper {
			display: block;
		}
	}

	.cog-wrapper {
		height: 0;
		max-width: 1000px;
		margin: auto;
		position: relative;
		z-index: 1;
	}

	.cog {
		width: 12rem;
	}

	.info {
		background-color: #fcf6d2;
		padding: 0.5rem;
	}

	.infotext {
		text-align: center;
		margin: 0 auto;
	}

	:root {
		/* same as heading-banner max-width */
		--content-max: 1052px;
		/* spacing between badge and right edge */
		--gutter: 32px;
	}

	header { position: relative; }

	.info {
		position: relative;
	}

	.fixed-bikes-badge {
		position: absolute;
		top: 100%;
		margin-top: -0.5rem;
		right: calc(50% - min(var(--content-max), 100vw) / 2 + var(--gutter));
		z-index: 0;
	}

</style>
