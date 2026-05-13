import httpClient from "../http/client";

interface LoginCredentials {
	email: string;
	password: string;
}

interface RegisterData {
	email: string;
	username: string;
	password: string;
}

interface AuthResponse {
	token: string;
	user: {
		id: string;
		email: string;
		username: string;
		role: string;
	};
}

export async function login(
	credentials: LoginCredentials,
): Promise<AuthResponse> {
	const response = await httpClient.post("/api/v1/auth/login", credentials);
	return response.data;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
	const response = await httpClient.post("/api/v1/auth/register", data);
	return response.data;
}

export async function logout(): Promise<void> {
	await httpClient.post("/api/v1/auth/logout");
}

export async function getCurrentUser() {
	const response = await httpClient.get("/api/v1/auth/me");
	return response.data;
}
