<script>
	export let data;
</script>

{#if !data.error}
	<h1>Welcome!</h1>
	<p>We have registred your membership.</p>
	<img src="/hjerte.png" alt="" />
{/if}

{#if data.error}
	<h1>Something went wrong!</h1>
	<p>Please try again, or contact support if the problem persists.</p>
{/if}
