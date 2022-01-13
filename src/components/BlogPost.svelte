<script>
	export let post;
</script>

<h1>{post.title}</h1>
<span>Published <date>{new Date(post.date).toLocaleDateString()}</date></span>
<svelte:component this={post.post.default} />
