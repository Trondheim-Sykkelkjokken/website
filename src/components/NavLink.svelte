<script>
	import { page } from '$app/stores';
	$: isActive = $page.path.startsWith($$props.href);

	export let href;
	export let title;
</script>

<a {href} {title} {...$$props} class:active={isActive}>
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

	/*Horrible hack */
	a::after {
		display: block;
		content: attr(title);
		font-weight: bolder;
		height: 1px;
		color: transparent;
		overflow: hidden;
		visibility: hidden;
	}
</style>
