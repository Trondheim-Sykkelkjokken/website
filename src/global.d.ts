/// <reference types="@sveltejs/kit" />
declare module '*.md' {
	import type { ComponentType, SvelteComponent } from 'svelte';
	const Component: ComponentType<SvelteComponent>;
	export default Component;
}
declare module '*&imagetools' {
	/**
	 * actual types
	 * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
	 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
	 */
	const out;
	export default out;
}
