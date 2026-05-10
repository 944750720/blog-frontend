import axios from "axios";
import httpClient from "./client";

type SWRKey = string | [string, ...unknown[]];

interface FetchError extends Error {
	status?: number;
}

const fetcher = async (key: SWRKey): Promise<unknown> => {
	const url = Array.isArray(key) ? key[0] : key;

	try {
		const { data } = await httpClient.get(url);
		return data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const error: FetchError = new Error(err.message);
			error.status = err.response?.status;
			throw error;
		}
		throw err;
	}
};

export default fetcher;
