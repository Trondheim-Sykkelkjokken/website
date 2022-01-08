<script context="module" lang="ts">
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
		const p = { post, slug, date, preamble, title };
		posts.push(p);
	}

	export async function load() {
		return {
			props: {
				posts
			}
		};
	}
</script>

<script lang="ts">
	export let posts;
</script>

<ul>
	{#each posts as { title, slug, date, preamble, post }}
		<li>
			<a rel="prefetch" href="/blog/{slug}">
				<h1>
					{title}
				</h1>
				<date>{date}</date>
				<p class="preamble">{preamble}</p>
				<svelte:component this={post.default} />
			</a>
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-bottom: 0;
	}

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

	.preamble {
		font-size: 1.2rem;
		font-weight: bold;
	}
</style>
