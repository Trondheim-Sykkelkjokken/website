<script>
	import { locale } from '$lib/translations';
	import PageEn from '../../content/pages/tools/tools.en.md';
	import PageNb from '../../content/pages/tools/tools.nb.md';
	import PageNn from '../../content/pages/tools/tools.nn.md';

	let currentLocale = 'en';
	locale.subscribe((value) => {
		currentLocale = value;
	});
</script>

<svelte:component
	this={currentLocale === 'nn' ? PageNn : currentLocale === 'nb' ? PageNb : PageEn}
/>
