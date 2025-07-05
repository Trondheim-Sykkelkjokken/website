<script>

    import { locale } from '$lib/translations';
    import PageEn from '../../content/pages/tools/tools.en.md';
    import PageNb from '../../content/pages/tools/tools.nb.md';

    let currentLocale = 'en';
    locale.subscribe((value) => {
        currentLocale = value;
	  });
  
</script>
  
  <svelte:component this={currentLocale === 'nb' ? PageNb : PageEn} />