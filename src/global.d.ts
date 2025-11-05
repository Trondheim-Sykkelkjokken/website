/// <reference types="@sveltejs/kit" />

// Environment variables
declare module '$env/static/private' {
	export const VIPPS_CLIENT_ID: string;
	export const VIPPS_CLIENT_SECRET: string;
	export const VIPPS_OCP_APIM_SUBSCRIPTION_KEY: string;
	export const VIPPS_MSN: string;
	export const VIPPS_BASE_URL: string;
	export const GOOGLE_SHEETS_KEY: string;
	export const GOOGLE_SHEETS_EMAIL: string;
	export const GOOGLE_SHEETS_ID: string;
	export const EVENTBRITE_API_KEY: string;
	export const LOG_SECRET: string;
	export const LOG_HOST: string;
	export const ENCRYPTION_KEY: string;
	export const INITIALIZATION_VECTOR: string;
	export const GOOGLE_GMAIL_CLIENT_ID: string;
	export const GOOGLE_GMAIL_SECRET: string;
	export const GOOGLE_GMAIL_REFRESH_TOKEN: string;
	export const GOOGLE_GMAIL_REDIRECT_URI: string;
	export const SIGNAL_GROUP_URL: string;
}

// Markdown imports
declare module '*.md' {
	import type { SvelteComponentTyped } from 'svelte';
	export default class MarkdownComponent extends SvelteComponentTyped<Record<string, any>> {}
	export const metadata: {
		title?: string;
		date?: string;
		[key: string]: any;
	};
}

// Image tools
declare module '*&imagetools' {
	/**
	 * actual types
	 * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
	 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
	 */
	const out;
	export default out;
}
