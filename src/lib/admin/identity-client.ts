// Browser-side helpers for the Netlify Identity widget.
// The widget is loaded globally in src/app.html and exposes itself on
// `window.netlifyIdentity`. This module wraps that with typed accessors and
// a small fetch helper so admin pages don't have to poke at `window` directly.

export type IdentityUser = {
	email?: string;
	jwt: () => Promise<string>;
};

export type NetlifyIdentity = {
	currentUser: () => IdentityUser | null;
	open: (tab?: 'login' | 'signup') => void;
	close: () => void;
	logout: () => void;
	on: (event: string, handler: (user?: IdentityUser) => void) => void;
	off: (event: string, handler?: (user?: IdentityUser) => void) => void;
};

export function getIdentity(): NetlifyIdentity | null {
	if (typeof window === 'undefined') return null;
	return (window as unknown as { netlifyIdentity?: NetlifyIdentity }).netlifyIdentity ?? null;
}

export async function getIdentityToken(): Promise<string | null> {
	return (await getIdentity()?.currentUser()?.jwt()) ?? null;
}

// GET helper that injects the bearer token if the user is logged in.
// Throws on non-2xx so callers can wrap in try/catch and render the error.
export async function adminGet<T>(path: string): Promise<T> {
	const token = await getIdentityToken();
	const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
	const res = await fetch(path, { headers });
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
	return (await res.json()) as T;
}
