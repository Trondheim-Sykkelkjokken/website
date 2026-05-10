<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';
	import {
		getIdentity,
		type IdentityUser,
		type NetlifyIdentity
	} from '$lib/admin/identity-client';

	let identity: NetlifyIdentity | null = null;
	let user: IdentityUser | null = null;

	function handleLogin(loggedIn?: IdentityUser) {
		user = loggedIn ?? identity?.currentUser() ?? null;
		identity?.close();
	}

	function handleLogout() {
		user = null;
	}

	onMount(() => {
		if (dev) return;
		identity = getIdentity();
		if (!identity) return;
		user = identity.currentUser();
		identity.on('login', handleLogin);
		identity.on('logout', handleLogout);
	});

	onDestroy(() => {
		identity?.off('login', handleLogin);
		identity?.off('logout', handleLogout);
	});

	function login() {
		identity?.open('login');
	}

	function logout() {
		identity?.logout();
	}

	$: pathname = $page.url.pathname;
</script>

<div class="admin-root">
	<nav class="admin-nav" aria-label="Admin">
		<a href="/admin" class:active={pathname === '/admin'}>Members</a>
		<a href="/admin/stats" class:active={pathname === '/admin/stats'}>Stats</a>
		<a href="/cms">CMS</a>
	</nav>

	{#if !user && !dev}
		<p>You need to be logged in to view this page.</p>
		<button on:click={login}>Log in</button>
	{:else}
		<p class="userbar">
			{#if user}
				Signed in as <strong>{user.email}</strong>
				<button on:click={logout}>Log out</button>
			{:else}
				<em>Dev mode — auth bypassed</em>
			{/if}
		</p>
		<slot />
	{/if}
</div>

<style>
	:global(body main:has(.admin-root)) {
		max-width: min(1600px, 95vw);
	}

	.admin-nav {
		display: flex;
		gap: 1.25rem;
		align-items: baseline;
		padding: 0.5rem 0;
		margin-bottom: 1rem;
		border-bottom: 1px solid #efeb92;
		font-size: 1.05rem;
	}

	.admin-nav a,
	.admin-nav a:visited {
		color: #393939;
		text-decoration: none;
	}

	.admin-nav a:hover,
	.admin-nav a:focus-visible {
		text-decoration: underline;
	}

	.admin-nav a.active {
		font-weight: bold;
	}

	.userbar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin: 0 0 1.5rem;
	}

	button {
		cursor: pointer;
	}
</style>
