import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requireAdmin } from '$lib/server/admin-auth';
import { getAllMembers } from '$lib/utils/turso';

export const GET: RequestHandler = async (event) => {
	await requireAdmin(event);
	return json({ members: await getAllMembers() });
};
