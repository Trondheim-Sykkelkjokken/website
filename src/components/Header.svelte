<script>
	import NavLink from './NavLink.svelte';
</script>

<header>
	<div id="nav-wrapper">
		<div class="heading-wrapper"><img class="heading" src="/title.png" alt="" /></div>
		<nav>
			<a href="/"><img class="cog" alt="" src="/logo.svg" /></a>
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
	}

	.heading {
		height: 5rem;
		margin: 0 auto;
		display: block;
		max-width: 100%;
		max-height: 4rem;
		width: auto;
		height: auto;
	}

	#nav-wrapper {
		background-color: #efeb92;
		padding-bottom: 1rem;
	}

	nav {
		max-width: 1000px;
		display: flex;
		margin: -10rem auto 0 auto;
		flex-direction: row;
		flex-wrap: wrap;
	}

	a {
		align-self: baseline;
	}

	.cog {
		display: inline;
		width: 12rem;
		position: relative;
		top: 6rem;
	}

	.info {
		background-color: #fcf6d2;
		padding-top: 0.5rem;
	}

	.infotext {
		text-align: center;
		max-width: 12rem;
		margin: 0 auto;
	}
</style>
