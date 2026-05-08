<script lang="ts">
	import { onMount } from 'svelte';
	import { adminGet } from '$lib/admin/identity-client';
	import type { MemberCounts } from '$lib/utils/turso';

	let counts: MemberCounts | null = null;
	let error: string | null = null;
	let loading = false;

	async function loadStats() {
		loading = true;
		error = null;
		try {
			counts = await adminGet<MemberCounts>('/admin/stats');
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	}

	onMount(loadStats);
</script>

<svelte:head>
	<title>Admin — stats</title>
</svelte:head>

<h1>Stats</h1>

{#if loading}
	<p>Loading…</p>
{:else if error}
	<p class="error">Error: {error}</p>
{:else if counts}
	<dl class="stats">
		<dt>Active memberships</dt>
		<dd>{counts.active}</dd>
		<dt>All historical memberships</dt>
		<dd>{counts.total}</dd>
	</dl>
{/if}

<style>
	.stats {
		display: grid;
		grid-template-columns: max-content auto;
		gap: 0.4rem 1.5rem;
		max-width: 30rem;
		margin: 0;
	}

	dt {
		font-weight: bold;
		margin: 0;
	}

	dd {
		margin: 0;
		font-variant-numeric: tabular-nums;
	}

	.error {
		color: #b00020;
	}
</style>
