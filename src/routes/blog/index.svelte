<script context="module" lang="ts">
	const posts = import.meta.glob('../../content/posts/*.md');
	let body = [];

	for (const path in posts) {
		body.push(posts[path]().then(({ metadata }) => metadata));
	}
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		const posts = await Promise.all(body);
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
	{#each posts as { title, slug, publication_date, preamble, image }}
		<li>
			<a rel="prefetch" href="/blog/{slug}">
				<h1>
					{title}
				</h1>
			</a>
			<img src={image} alt="" />
			<p class="preamble">{preamble}</p>
			<date>{publication_date}</date>
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
