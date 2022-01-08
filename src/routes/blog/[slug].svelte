<script context="module">
	// Get posts info
	const allPosts = import.meta.globEager(`../../content/posts/*.md`);

	let posts = [];
	// Get the posts' metadata
	for (let path in allPosts) {
		const post = allPosts[path];
		const slug = post.metadata.slug;
		const date = post.metadata.publication_date;
		const title = post.metadata.title;
		const p = { post, slug, date, title };
		posts.push(p);
	}

	export function load({ page }) {
		const { slug } = page.params;

		// Find the post with the slug
		const filteredPost = posts.find((p) => {
			return p.slug.toLowerCase() === slug.toLowerCase();
		});

		return {
			props: {
				// Tell page to load that post's module
				page: filteredPost.post.default,
				date: filteredPost.date,
				title: filteredPost.title
			}
		};
	}
</script>

<script>
	export let page;
	export let date;
	export let title;
</script>

<div>
	<h1>{title}</h1>
	<span>Published <date>{date}</date></span>
	<svelte:component this={page} />
</div>

<style>
	h1 {
		font-size: 3rem;
	}
</style>
