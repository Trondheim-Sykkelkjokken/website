<script lang="ts">
	import type { PostSummary } from '$lib/types/post.type';
	export let post: PostSummary;
</script>

<h1>{post.title}</h1>
<span>Published <date>{new Date(post.date).toLocaleDateString()}</date></span>
<svelte:component this={post.post.default} />
