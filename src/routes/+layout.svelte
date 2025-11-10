<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import messageData from '../config/header_message.json';
	import { navigating } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';
	import { t, locale, locales } from '$lib/translations';

	let message = '';
	locale.subscribe((value) => {
		message = messageData[value].message;
	});


</script>

<Header {message} />

<main>
	{#if $navigating}
		<Spinner />
	{:else}
		<slot />
	{/if}
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

	:global(html) {
		overflow-y: scroll;
	}

	:global(img) {
		max-width: 100%;
	}

	:global(#svelte) {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #a6d2d5;
	}

	main {
		padding: 1rem 1rem;
		max-width: 800px;
		margin: 0 auto;
		color: #393939;
		flex-grow: 1;
		width: calc(100% - 2rem);
	}
</style>
