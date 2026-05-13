import { HttpResponse, http } from "msw";
import { BASE } from "../constants";
import { mockAuthResponse } from "../data";

export const authHandlers = [
	http.post(`${BASE}/api/v1/auth/login`, () => {
		return HttpResponse.json(mockAuthResponse);
	}),

	http.post(`${BASE}/api/v1/auth/register`, () => {
		return HttpResponse.json(mockAuthResponse);
	}),

	http.post(`${BASE}/api/v1/auth/logout`, () => {
		return HttpResponse.json({ success: true });
	}),

	http.get(`${BASE}/api/v1/auth/me`, () => {
		return HttpResponse.json(mockAuthResponse.user);
	}),
];
