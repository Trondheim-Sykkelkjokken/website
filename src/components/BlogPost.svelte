<script>
	export let post;
</script>

<h1>{post.title}</h1>
<span>Published <date>{post.date}</date></span>
<svelte:component this={post.post.default} />
