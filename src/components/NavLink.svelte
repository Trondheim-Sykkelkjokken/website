<script lang="ts">
	export let onClick: () => void;
	export let href: string;
	export let title: string;

	import { page } from '$app/stores';

	//TODO: refactor this maybe?
	$: isActive = () => {
		if ($page.path === '/' && $$props.href === '/') {
			return true;
		}
		return $page.path.startsWith($$props.href) && $$props.href.length > 1;
	};
</script>

<a {href} {title} on:click={onClick} class:active={isActive()} class:hidden={$$props.href === '/'}>
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

	.hidden {
		display: none;
	}

	@media (max-width: 720px) {
		.hidden {
			display: inline;
		}
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
