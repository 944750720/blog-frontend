export function useAuth() {
	return {
		user: null as {
			user_id: number;
			username: string;
			role: string;
			avatar_url: string;
		} | null,
		isAuthenticated: false,
		isLoading: false,
	};
}
