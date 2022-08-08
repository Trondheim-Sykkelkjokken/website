<script context="module" lang="ts">
	import type { Post } from 'src/types/post.type';

	// Get posts info
	const allPosts = import.meta.glob(`../../content/posts/*.md`, { eager: true });

	let posts = [];
	// Get the posts' metadata
	for (let path in allPosts) {
		const post = allPosts[path] as Post;
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
				post: filteredPost
			}
		};
	}
</script>

<script>
	import BlogPost from '../../components/BlogPost.svelte';
	export let post;
</script>

<BlogPost {post} />
