import type { RequestHandler } from '@sveltejs/kit';
import { getLoginResponse } from '$lib/server/auth-routes';

export const GET: RequestHandler = (event) => getLoginResponse(event);
