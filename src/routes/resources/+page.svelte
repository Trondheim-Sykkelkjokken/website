<script>

    import { locale } from '$lib/translations';
    import PageEn from '../../content/pages/resources/resources.en.md';
    import PageNo from '../../content/pages/resources/resources.no.md';

    let currentLocale = 'en';
    locale.subscribe((value) => {
        currentLocale = value;
	});
  
  </script>
  
  <svelte:component this={currentLocale === 'no' ? PageNo : PageEn} />