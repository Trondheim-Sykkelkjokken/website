<script lang="ts">
	import type { PageData } from './$types';
	import BlogPost from '$lib/components/BlogPost.svelte';
	export let data: PageData;
</script>

<ul>
	{#each data.posts as post}
		<li>
			<a href="/blog/{post.slug}">
				<BlogPost {post} />
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	/* Dashed line to separate entries -- keep style in sync with events page! */
	li {
		padding-bottom: 1rem;
		border-bottom: 1px dashed #fcf6d2;
	}
	li:last-child {
		border-style: none;
	}

	a,
	a:visited,
	a:hover,
	a:active {
		color: inherit;
		text-decoration: none;
	}
</style>
