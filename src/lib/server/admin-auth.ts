import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { RequestEvent } from '@sveltejs/kit';

// Validates a Netlify Identity bearer token by asking the site's Identity
// service (`/.netlify/identity/user`) to look it up — that endpoint is the
// authoritative validator for tokens issued by this site's Identity instance.
// Throws 401 on any failure. In `vite dev` the check is skipped — `dev` is
// statically inlined to `false` by Vite at build time, so this bypass cannot
// run in production.
export async function requireAdmin(event: RequestEvent): Promise<void> {
	if (dev) return;

	const auth = event.request.headers.get('authorization');
	if (!auth?.startsWith('Bearer ')) throw error(401, 'no token');

	const verify = await event.fetch(`${event.url.origin}/.netlify/identity/user`, {
		headers: { Authorization: auth }
	});
	if (!verify.ok) {
		console.warn(`[admin-auth] Identity verify failed: ${verify.status}`);
		throw error(401, 'invalid token');
	}
}
