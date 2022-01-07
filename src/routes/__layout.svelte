<header>
	<div id="nav-wrapper">
		<nav>
			<a href="/"><img alt="" src="/logo.svg" /></a>
			<a href="/about">About</a>
			<a href="/blog">Blog</a>
			<a href="/events">Events</a>
			<a href="/resources">Resources</a>
			<a href="/getinvolved">Get involved</a>
			<a href="/contact">Contact</a>
		</nav>
	</div>
</header>

<main>
	<slot />
</main>

<footer>
	<div id="footer-banner">Trondheim Sykkelkjøkken</div>
</footer>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
		background-color: #a6d2d5;
        font-family: sans-serif;
	}

	:global(#svelte) {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	#nav-wrapper {
		background-color: #efeb92;
	}
	nav {
		max-width: 1200px;
		margin: 0 auto;
	}

	img {
		display: inline;
		width: 10rem;
		position: relative;
	}

	main {
		padding: 1rem 0;
		max-width: 1200px;
		margin: 0 auto;
		color: whitesmoke;
		flex-grow: 1;
		width: 100%;
	}

	footer {
		padding-top: 1rem;
		background-color: #efeb92;
		min-height: 3rem;
	}

	#footer-banner {
		background-color: #efa170;
	}
</style>
