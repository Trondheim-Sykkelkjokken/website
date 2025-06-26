<script lang="ts">
	import AiOutlineMenu from 'svelte-icons-pack/ai/AiOutlineMenu';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import NavLink from './NavLink.svelte';
	import LangButton from './LangButton.svelte';

	import { navOpen, setNavOpen } from '../../stores';
	import { t } from '$lib/translations';

	let open: boolean;
	navOpen.subscribe((value) => {
		open = value;
	});

	export let message: string;
</script>

<header>
	<div class="cog-wrapper"><a href="/"><img class="cog" alt="" src="/logo.svg" /></a></div>
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
	<div id="nav-wrapper">
		<nav class:hidden={!open}>
			<NavLink title={$t('layout.home')} href="/" />
			<NavLink title={$t('layout.events')} href="/events" />
			<NavLink title={$t('layout.membership')} href="/membership" />
			<!-- <NavLink title="Blog" href="/blog" /> -->
			<NavLink title={$t('layout.volunteer')} href="/volunteer" />
			<NavLink title={$t('layout.tools')} href="/tools" />
			<NavLink title={$t('layout.resources')} href="/resources" />
			<div class="i18n-menu-wrapper">
				<LangButton />
			</div>
		</nav>
	</div>
	<div class="info">
		<p class="infotext">{message}</p>
	</div>
</header>

<style>
	.heading-wrapper {
		background-color: white;
	}
	.heading-banner {
		background-color: white;
		width: 100%;
		display: flex;
		flex-direction: row;
		max-width: 1025px;
		margin: 0 auto;
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

	.i18n-heading-wrapper {
		margin-top: 15px;
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
</style>
