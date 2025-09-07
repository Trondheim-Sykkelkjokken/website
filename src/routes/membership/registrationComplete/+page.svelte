<script>
	import { t } from '$lib/translations';
	export let data;
</script>

{#if !data.error}
	<h1>{@html $t('membership.welcome')}, {data.name}!</h1>

	<p>{@html $t('membership.registred_paragraph')}</p>
	<img src="/hjerte.png" alt="" />
{/if}

{#if data.error}
	<h1>{@html $t('membership.error_heading')}</h1>
	<p>{@html $t('membership.error_paragraph')}</p>
	<img src="/crash.png" alt="" width="500" />
{/if}
