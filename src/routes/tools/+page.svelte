<script>
	import { locale } from '$lib/translations';
	import PageEn from '../../content/pages/tools/tools.en.md';
	import PageNb from '../../content/pages/tools/tools.nb.md';
	import PageNn from '../../content/pages/tools/tools.nn.md';
	import toolsCabinet from '$lib/assets/tools-cabinet.jpg?w=600&format=webp&srcset&imagetools';
	import toolsCabinetBig from '$lib/assets/tools-cabinet.jpg';

	let currentLocale = 'en';
	locale.subscribe((value) => {
		currentLocale = value;
	});
</script>

<div class="tools-container">
	<!-- List of tools -->
	<div class="tools-content">
		<svelte:component
			this={currentLocale === 'nn' ? PageNn : currentLocale === 'nb' ? PageNb : PageEn}
		/>
	</div>

	<!-- Picture of tools cabinet -->
	<div class="tools-image">
		<a href={toolsCabinetBig} target="_blank">
			<img srcset={toolsCabinet} alt="Tool cupboard" />
		</a>
	</div>
</div>

<style>
	/* Two-column layout: text (60%) on left, image (40%) on right */
	.tools-container {
		display: grid;
		grid-template-columns: 60fr 40fr;
		gap: 1rem;
		align-items: start;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Push image down to align with list content below heading */
	.tools-image {
		margin-top: 6rem;
	}

	/* Prevent grid overflow issues with long words */
	.tools-content {
		min-width: 0;
	}

	/* Split tool list into two columns (uses :global because content comes from markdown) */
	.tools-content :global(ul) {
		column-count: 2;
		column-gap: 2rem;
	}

	.tools-content :global(li) {
		/* Prevent list items from breaking across columns */
		break-inside: avoid;
		/* Keep hyphenated words together (e.g., "Bremsevaier og -strømpe") */
		word-break: keep-all;
	}

	/* Mobile: stack vertically, single column list */
	@media (max-width: 768px) {
		.tools-container {
			grid-template-columns: 1fr;
		}

		.tools-content :global(ul) {
			column-count: 1;
		}
	}
</style>
