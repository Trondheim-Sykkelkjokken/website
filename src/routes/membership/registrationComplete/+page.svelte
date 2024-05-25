<script>
	export let data;
</script>

{#if !data.error}
	<h1>Welcome, {data.name}!</h1>
	<p>We have registred your membership.</p>
	<img src="/hjerte.png" alt="" />
{/if}

{#if data.error}
	<h1>Something went wrong!</h1>
	<p>
		Please try again, or contact us at <a href="mailto:kontakt@sykkelkjokken.no"
			>kontakt@sykkelkjokken.no</a
		> if the problem persists.
	</p>
	<img src="/crash.png" alt="" width="500" />
{/if}
