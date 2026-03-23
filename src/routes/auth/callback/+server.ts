import type { RequestHandler } from '@sveltejs/kit';
import { getCallbackResponse } from '$lib/server/auth-routes';

export const GET: RequestHandler = async (event) => getCallbackResponse(event);
