<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const post = data.post;
</script>

{#if post}
	<BlogPost {post} />
{:else}
	<p>Post not found</p>
{/if}
