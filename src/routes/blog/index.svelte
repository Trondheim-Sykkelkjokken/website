<script context="module" lang="ts">
	const allPosts = import.meta.globEager(`../../content/posts/*.md`);

	let posts = [];
	for (let path in allPosts) {
		const post = allPosts[path];
		const slug = post.metadata.slug;
		const date = post.metadata.publication_date;
		const title = post.metadata.title;
		const p = { post, slug, date, title };
		posts.push(p);
	}

	posts = posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

	export async function load() {
		return {
			props: {
				posts
			}
		};
	}
</script>

<script lang="ts">
	import BlogPost from '../../components/BlogPost.svelte';

	export let posts;
</script>

<ul>
	{#each posts as post}
		<li>
			<a href="/blog/{post.slug}">
				<BlogPost {post} />
			</a>
		</li>
	{/each}
</ul>

<style>
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
</style>
