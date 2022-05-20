/* eslint-disable */

import axios from 'axios';
import {
	type IAuthTokens,
	type TokenRefreshRequest,
	getAccessToken,
	applyAuthTokenInterceptor,
	clearAuthTokens,
} from 'axios-jwt';

export const client = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com',
});

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
	const accessToken = getAccessToken();

	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
			refreshToken,
			accessToken,
		});

		return response.data;
	} catch (error) {
		console.error('Refresh Error');
		clearAuthTokens();

		return '';
	}
};

// Uncomment the following line if you want to apply the token interceptor
// applyAuthTokenInterceptor(client, { requestRefresh });
