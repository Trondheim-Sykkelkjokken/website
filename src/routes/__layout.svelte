<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	:global(html, body) {
		padding: 0;
		font-size: 105%;
		height: 100%;
		margin: 0;
		font-family: sans-serif;
	}

	:global(#svelte) {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #a6d2d5;
	}

	main {
		padding: 1rem 0;
		max-width: 800px;
		margin: 0 auto;
		color: whitesmoke;
		flex-grow: 1;
		width: 100%;
	}
</style>
