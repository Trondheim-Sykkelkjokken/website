<script context="module">
	// Get posts info
	const allPosts = import.meta.globEager(`../../content/posts/*.md`);

	let posts = [];
	// Get the posts' metadata
	for (let path in allPosts) {
		const post = allPosts[path];
		const slug = post.metadata.slug;
		const date = post.metadata.publication_date;
		const preamble = post.metadata.preamble;
		const title = post.metadata.title;
		const image = post.metadata.image;
		const p = { post, slug, date, preamble, title, image };
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
				preamble: filteredPost.preamble,
				title: filteredPost.title,
				image: filteredPost.image
			}
		};
	}
</script>

<script>
	// Declare the page variable to use on the client
	export let page;
	export let date;
	export let preamble;
	export let title;
	export let image;
</script>

<!-- Here we'll load the component of the blog post page itself -->
<div>
	<h1>{title}</h1>
	<img src={image} alt="" />
	<span>Published <date>{date}</date></span>
	<p class="lead">{preamble}</p>
	<svelte:component this={page} />
</div>

<style>
	h1 {
		font-size: 3rem;
	}

	img {
		max-width: 100%;
	}

	.lead {
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
