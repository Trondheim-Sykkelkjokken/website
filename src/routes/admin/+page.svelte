<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { adminGet } from '$lib/admin/identity-client';
	import type { MemberRow } from '$lib/utils/turso';

	let members: MemberRow[] | null = null;
	let error: string | null = null;
	let loading = false;
	let view: 'active' | 'all' = 'active';
	let copyFeedback: string | null = null;
	let copyTimer: ReturnType<typeof setTimeout> | null = null;

	function isActive(m: MemberRow): boolean {
		if (!m.expiry_date) return false;
		const d = new Date(m.expiry_date);
		return !Number.isNaN(d.getTime()) && d.getTime() > Date.now();
	}

	$: activeMembers = (members ?? []).filter(isActive);
	$: displayedMembers = view === 'active' ? activeMembers : (members ?? []);

	function showCopyFeedback(msg: string) {
		copyFeedback = msg;
		if (copyTimer) clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copyFeedback = null), 2000);
	}

	async function copyEmails() {
		const unique = Array.from(
			new Set(displayedMembers.map((m) => m.email.trim().toLowerCase()))
		).filter(Boolean);
		try {
			await navigator.clipboard.writeText(unique.join(', '));
			showCopyFeedback(`Copied ${unique.length} emails`);
		} catch (e) {
			console.error('[admin] clipboard write failed:', e);
			showCopyFeedback('Copy failed');
		}
	}

	async function loadMembers() {
		loading = true;
		error = null;
		try {
			const data = await adminGet<{ members: MemberRow[] }>('/admin/members');
			members = data.members;
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	}

	onMount(loadMembers);

	onDestroy(() => {
		if (copyTimer) clearTimeout(copyTimer);
	});

	function fmtDate(iso: string | null): string {
		if (!iso) return '';
		const d = new Date(iso);
		return Number.isNaN(d.getTime()) ? iso : d.toISOString().slice(0, 10);
	}

	function fmtEmailSent(v: number | null): string {
		if (v === 1) return 'yes';
		if (v === 0) return 'no';
		return '';
	}
</script>

<svelte:head>
	<title>Admin — members</title>
</svelte:head>

<h1>Members</h1>
{#if members}
	<p class="active-count">{activeMembers.length} active members</p>
{/if}

{#if loading}
	<p>Loading…</p>
{:else if error}
	<p class="error">Error: {error}</p>
{:else if members && members.length === 0}
	<p>No members yet.</p>
{:else if members}
	<div class="controls">
		<fieldset class="view-toggle">
			<legend class="sr-only">Filter</legend>
			<label
				><input type="radio" bind:group={view} value="active" /> Currently active memberships</label
			>
			<label
				><input type="radio" bind:group={view} value="all" /> All historical memberships</label
			>
		</fieldset>
		<span class="count">{displayedMembers.length} shown</span>
		<button type="button" on:click={copyEmails} disabled={!displayedMembers.length}>
			Copy emails 📋
		</button>
		{#if copyFeedback}<span class="copy-feedback">{copyFeedback}</span>{/if}
	</div>
	<div class="table-wrap">
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Type</th>
					<th>Registered</th>
					<th>Payment</th>
					<th>Paid</th>
					<th>Expires</th>
					<th>Email sent</th>
				</tr>
			</thead>
			<tbody>
				{#each displayedMembers as m (m.id)}
					<tr>
						<td>{m.name}</td>
						<td>{m.email}</td>
						<td>{m.membership_type}</td>
						<td>{fmtDate(m.registered_at)}</td>
						<td>{m.payment_type ?? ''}</td>
						<td>{fmtDate(m.payment_date)}</td>
						<td>{fmtDate(m.expiry_date)}</td>
						<td>{fmtEmailSent(m.email_sent)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	h1 {
		margin-bottom: 0.25rem;
	}

	.active-count {
		margin: 0 0 1rem;
		opacity: 0.8;
	}

	.count {
		opacity: 0.7;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin: 0 0 1rem;
		flex-wrap: wrap;
	}

	.controls button {
		margin-left: auto;
	}

	.view-toggle {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: 0.75rem;
	}

	.view-toggle label {
		cursor: pointer;
	}

	.copy-feedback {
		opacity: 0.8;
		font-size: 0.9rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.error {
		color: #b00020;
	}

	.table-wrap {
		overflow-x: auto;
	}

	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 0.9rem;
	}

	th,
	td {
		text-align: left;
		padding: 0.4rem 0.6rem;
		border-bottom: 1px dashed #fcf6d2;
		white-space: nowrap;
	}

	th {
		background: #efeb92;
	}

	tbody tr:hover {
		background: rgba(255, 255, 255, 0.4);
	}

	button {
		cursor: pointer;
	}
</style>
