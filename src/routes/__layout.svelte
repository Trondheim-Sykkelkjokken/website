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
	<div id="footer-banner">
		<div class="flex-container">
			<div class="footer-item">Stammen kafe og bar</div>
			<div class="footer-item">Trondheim Sykkelkjøkken</div>
			<div class="footer-item">Social media links here</div>
		</div>
	</div>
</footer>

<style>
	:global(html, body) {
		padding: 0;
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
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	a,
	a:visited,
	a:hover,
	a:active {
		color: #676a3e;
		text-decoration: none;
		text-transform: uppercase;
		flex-grow: 1;
		font-size: 1.2rem;
		align-self: baseline;
	}

	img {
		display: inline;
		width: 10rem;
		position: relative;
	}

	main {
		padding: 1rem 0;
		max-width: 800px;
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
		width: 100%;
	}

	.flex-container {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.footer-item {
		flex-grow: 1;
	}

	.footer-item:nth-child(2) {
		text-align: center;
	}

	.footer-item:last-child {
		text-align: right;
	}
</style>
