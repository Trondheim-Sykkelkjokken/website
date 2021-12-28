<header>
	<div id="nav-wrapper">
		<nav>
			<a href="/"><img alt="" src="https://sykkelkjokken.no/logo.png" /></a>
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
	:global(body) {
		margin: 0;
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
		max-width: 1200px;
		margin: 0 auto;
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
