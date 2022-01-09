<script conext="module">
	import BurgerMenu from 'svelte-burger-menu';
</script>

<div>
	<BurgerMenu backgroundColor="white" padding={'25px'}>
		<h2>Home</h2>
		<h2>About</h2>
	</BurgerMenu>
</div>

<style>
	@media (min-width: 480px) {
		div {
			display: none;
		}
	}
</style>
