<script context="module">
	// Get posts info
	const allPosts = import.meta.globEager(`../../content/posts/*.md`);

	let posts = [];
	// Get the posts' slugs
	for (let path in allPosts) {
		const post = allPosts[path];
		const slug = post.metadata.slug;
		const p = { post, slug };
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
				page: filteredPost.post.default
			}
		};
	}
</script>

<script>
	// Declare the page variable to use on the client
	export let page;
</script>

<!-- Here we'll load the component of the blog post page itself -->
<svelte:component this={page} />
