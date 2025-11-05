import type { SvelteComponentTyped } from 'svelte';

export type Post = {
	metadata: {
		slug: string;
		publication_date: string;
		title: string;
	};
	default: typeof SvelteComponentTyped;
};

export type PostSummary = {
	post: Post;
	slug: string;
	date: string;
	title: string;
};
