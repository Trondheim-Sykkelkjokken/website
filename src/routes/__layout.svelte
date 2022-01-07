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

	main {
		padding: 1rem 0;
		max-width: 800px;
		margin: 0 auto;
		color: whitesmoke;
		flex-grow: 1;
		width: 100%;
	}
</style>
