<script>
	import AiOutlineMenu from 'svelte-icons-pack/ai/AiOutlineMenu';
	import Icon from 'svelte-icons-pack/Icon.svelte';
</script>

<button on:click={() => alert('hei')}><Icon color="black" src={AiOutlineMenu} /></button>

<style>
	button {
		font-size: 1.5rem;
		display: none;
		margin-bottom: -1rem;
		border: 0;
		background-color: transparent;
		display: inline-block;
	}

	div {
		position: fixed;
		height: 100vh;
		width: 80vw;
		background-color: white;
	}

	@media (max-width: 480px) {
		button {
			display: inline-block;
		}
	}
</style>
