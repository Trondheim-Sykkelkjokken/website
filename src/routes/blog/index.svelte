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

<h1>Blog</h1>

<ul>
	{#each posts as { title, slug, publication_date }}
		<li>
			<a rel="prefetch" href="/{slug}">
				<h2>
					{title}
				</h2>
				<date>{publication_date}</date>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
	}
</style>
