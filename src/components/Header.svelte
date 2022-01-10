<script>
	import AiOutlineMenu from 'svelte-icons-pack/ai/AiOutlineMenu';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import NavLink from './NavLink.svelte';
	let navOpen = false;
</script>

<header>
	<div class="cog-wrapper"><a href="/"><img class="cog" alt="" src="/logo.svg" /></a></div>
	<div class="heading-banner">
		<a href="/" class="heading-link"><img class="heading" src="/title.png" alt="" /></a>
		<button on:click={() => (navOpen = !navOpen)}>
			<Icon color="black" src={AiOutlineMenu} />
		</button>
	</div>
	<div id="nav-wrapper">
		<nav class:hidden={!navOpen}>
			<NavLink title="About" onClick={() => (navOpen = false)} href="/about">About</NavLink>
			<NavLink title="Blog" onClick={() => (navOpen = false)} href="/blog">Blog</NavLink>
			<NavLink title="Events" onClick={() => (navOpen = false)} href="/events">Events</NavLink>
			<NavLink title="Resources" onClick={() => (navOpen = false)} href="/resources"
				>Resources</NavLink
			>
			<NavLink title="Get involved" onClick={() => (navOpen = false)} href="/getinvolved"
				>Get involved</NavLink
			>
			<NavLink title="Contact" onClick={() => (navOpen = false)} href="/contact">Contact</NavLink>
		</nav>
	</div>
	<div class="info">
		<p class="infotext">We're open every <time>Thursday 17:00 - 20:00!</time></p>
	</div>
</header>

<style>
	.heading-banner {
		background-color: white;
		width: 100%;
		display: flex;
		flex-direction: row;
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

	@media (max-width: 720px) {
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
		max-width: 12rem;
		margin: 0 auto;
	}
</style>
