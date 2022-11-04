import type { PageLoad } from './$types';
import type { Post } from 'src/types/post.type';


const allPosts = import.meta.glob(`../../content/posts/*.md`, { eager: true });


let posts = [];
for (let path in allPosts) {
    const post = allPosts[path] as Post;
    const slug = post.metadata.slug;
    const date = post.metadata.publication_date;
    const title = post.metadata.title;
    const p = { post, slug, date, title };
    posts.push(p);
}
posts = posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const load: PageLoad = () => {
    return { posts: posts };
}