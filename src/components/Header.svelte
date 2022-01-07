<header>
	<div id="nav-wrapper">
		<div class="heading-wrapper"><img class="heading" src="/title.png" alt="" /></div>
		<nav>
			<a href="/"><img class="cog" alt="" src="/logo.svg" /></a>
			<a href="/about">About</a>
			<a href="/blog">Blog</a>
			<a href="/events">Events</a>
			<a href="/resources">Resources</a>
			<a href="/getinvolved">Get involved</a>
			<a href="/contact">Contact</a>
		</nav>
	</div>
	<div class="info">
		<p class="infotext">We're open every <time>Thursday 17:00 - 20:00!</time></p>
	</div>
</header>

<style>
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

	/*cog*/
	a:first-child {
		position: relative;
		top: 6rem;
	}

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

	.info {
		background-color: #fcf6d2;
		padding-top: 0.5rem;
	}

	.infotext {
		text-align: center;
		max-width: 11rem;
		margin: 0 auto;
	}

	.cog {
		display: inline;
		width: 12rem;
	}
</style>
