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
				<img src={image} alt="" />
				<p class="preamble">{preamble}</p>
				<date>{publication_date}</date>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
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
