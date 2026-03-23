import type { RequestHandler } from '@sveltejs/kit';
import { getLogoutResponse } from '$lib/server/auth-routes';

export const GET: RequestHandler = (event) => getLogoutResponse(event);
