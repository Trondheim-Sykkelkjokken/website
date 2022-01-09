<script>
	import NavLink from './NavLink.svelte';
</script>

<header>
	<div class="cog-wrapper"><a href="/"><img class="cog" alt="" src="/logo.svg" /></a></div>
	<div class="heading-wrapper">
		<img class="heading" src="/title.png" alt="" />
	</div>
	<div id="nav-wrapper">
		<nav>
			<NavLink title="About" href="/about">About</NavLink>
			<NavLink title="Blog" href="/blog">Blog</NavLink>
			<NavLink title="Events" href="/events">Events</NavLink>
			<NavLink title="Resources" href="/resources">Resources</NavLink>
			<NavLink title="Get involved" href="/getinvolved">Get involved</NavLink>
			<NavLink title="Contact" href="/contact">Contact</NavLink>
		</nav>
	</div>
	<div class="info">
		<p class="infotext">We're open every <time>Thursday 17:00 - 20:00!</time></p>
	</div>
</header>

<style>
	.heading-wrapper {
		background-color: white;
		width: 100%;
	}

	.heading {
		height: 5rem;
		display: block;
		max-width: 100%;
		max-height: 4rem;
		width: auto;
		height: auto;
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

	@media (max-width: 720px) {
		nav {
			flex-direction: column;
			padding-left: 0;
			align-content: baseline;
			padding-left: 1rem;
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
