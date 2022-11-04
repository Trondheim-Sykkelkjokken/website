<script lang="ts">
	import type { PageData } from './$types';
	import BlogPost from '$lib/BlogPost.svelte';
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

	li {
		padding-bottom: 1rem;
		border-bottom: whitesmoke 1px dashed;
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
