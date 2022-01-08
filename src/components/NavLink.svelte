<script>
	import { page } from '$app/stores';
	$: isActive = $page.path.startsWith($$props.href);

	export let href;
</script>

<a {href} {...$$props} class:active={isActive}>
	<slot />
</a>

<style>
	a,
	a:visited,
	a:active {
		color: #676a3e;
		text-decoration: none;
		text-transform: uppercase;
		flex-grow: 1;
		font-size: 1.2rem;
		align-self: baseline;
	}

	a.active {
		font-weight: bolder;
	}
</style>
