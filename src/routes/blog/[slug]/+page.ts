import type { PageLoad } from './$types';
import type { Post } from 'src/types/post.type';

// Get posts info
const allPosts = import.meta.glob(`../../../content/posts/*.md`, { eager: true });
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

export const load: PageLoad = ({ params }) => {
    return {
        post: posts.find(x => x.slug === params.slug)
    };
}

