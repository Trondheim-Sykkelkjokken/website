<script>

    import { locale } from '$lib/translations';
    import PageEn from '../../content/pages/resources/resources.en.md';
    import PageNb from '../../content/pages/resources/resources.nb.md';
    import PageNn from '../../content/pages/resources/resources.nn.md';

    let currentLocale = 'en';
    locale.subscribe((value) => {
        currentLocale = value;
	});
  
  </script>
  
  <svelte:component this={currentLocale === 'nn' ? PageNn : currentLocale === 'nb' ? PageNb : PageEn} />