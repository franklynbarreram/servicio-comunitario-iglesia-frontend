import { AuthService } from 'api';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import camelcaseKeys from 'camelcase-keys';

const options: NextAuthOptions = {
	debug: true,
	providers: [
		Providers.Credentials({
			name: 'Credentials',
			authorize: async (credentials: {
				username?: string;
				password?: string;
				refreshToken?: any;
				oldSession?: any;
				dataLoginOfRegister?: any;
			}) => {
				if (credentials.refreshToken && credentials.oldSession) {
					return {
						...JSON.parse(credentials.oldSession),
						token: credentials.refreshToken,
					};
				}

				if (credentials.dataLoginOfRegister)
					return JSON.parse(credentials.dataLoginOfRegister);

				const payload = {
					username: credentials.username!,
					password: credentials.password!,
				};
				return AuthService.login(payload).catch((error) => {
					return Promise.reject(new Error(error.message));
				});
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		session: async (session, token: any) => {
			if (token) {
				session.user = camelcaseKeys(token.user);
				session.accessToken = token.access_token;
			}
			return session;
		},
		jwt: async (token, data: any) => {
			if (data) {
				token = data.data;
			}
			return token;
		},
	},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
