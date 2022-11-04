<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const post = data.post;
	console.log('data: ', data);
</script>

<BlogPost {post} />
