<script lang="ts">
	export let href: string;
	export let title: string;
	import { navOpen, setNavOpen } from '../../stores';
	import { page } from '$app/stores';

	let open: boolean;
	navOpen.subscribe((value) => {
		open = value;
	});
</script>

<a
	{href}
	{title}
	on:click={() => setNavOpen(false)}
	class:active={$page.url.pathname.includes(href) && href !== '/'}
	class:hidden={$$props.href === '/'}
>
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

	/*Horrible hacky fix on spacing when font is bolded
	https://stackoverflow.com/questions/556153/inline-elements-shifting-when-made-bold-on-hover */
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
