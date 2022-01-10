<script lang="ts">
	import { page } from '$app/stores';
	$: isActive = $page.path.startsWith($$props.href);

	export let onClick: () => void;
	export let href: string;
	export let title: string;
</script>

<a {href} {title} on:click={onClick} class:active={isActive}>
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
