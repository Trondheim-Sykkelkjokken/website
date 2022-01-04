<script context="module">
	// Get posts info
	const allPosts = import.meta.globEager(`../../content/posts/*.md`);

	let posts = [];
	// Get the posts' metadata
	for (let path in allPosts) {
		const post = allPosts[path];
		const slug = post.metadata.slug;
		const date = post.metadata.publication_date;
		const p = { post, slug, date };
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
				date: filteredPost.date
			}
		};
	}
</script>

<script>
	// Declare the page variable to use on the client
	export let page;
	export let date;
</script>

<!-- Here we'll load the component of the blog post page itself -->
<div>
	<date>{date}</date>
	<svelte:component this={page} />
</div>
