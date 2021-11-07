import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
// import { UsersApiServices } from 'api/users/UsersService';
import { signOut } from 'next-auth/client';
const options: NextAuthOptions = {
	debug: true,
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			profile: (data) => ({
				id: '',
				provider: 'google',
				...data,
			}),
		}),

		Providers.Credentials({
			name: 'Credentials',
			authorize: async (credentials: { email?: string; password?: string }) => {
				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_API}/auth/login/user`,
						{
							method: 'POST',
							body: JSON.stringify({
								email: credentials.email,
								password: credentials.password,
							}),
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);
					if (res) {
						const responseData = await res.json();

						if (responseData?.user?.email) {
							return responseData;
						}
					}
					return Promise.resolve(null);
				} catch (error) {
					console.log(error);
					return Promise.resolve(null);
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		session: async (session, token: any) => {
			if (token) {
				// session.user = camelcaseKeys(token.user.email);
				session.user = token.user;
				session.accessToken = token.access_token;
				session.tokenExpired = token.accessTokenExpires;
				// session.roles = token.user.roles;
			}
			return session;
		},
		jwt: async (token: any, response: any, account: any) => {
			if (response) {
				if (response.provider) {
					// const sessionUserSocial = await UsersApiServices.createUserSocial(
					// 	response
					// );
					// // console.log('social:', sessionUserSocial);
					// if (sessionUserSocial.user && sessionUserSocial.access_token) {
					// 	token.user = sessionUserSocial.user;
					// 	token.access_token = sessionUserSocial.access_token;
					// 	token.accessTokenExpires = sessionUserSocial.expiresIn;
					// }
				} else {
					token = response;
				}
				// return token;
			}
			// Initial sign in
			if (account && response) {
				token = {
					// accessTokenExpires: response.expirationTime,
					accessTokenExpires: response.expiresIn,
					...token,
				};

				return token;
			}
			const actuallyDay = new Date(Date.now());
			// console.log('expired antes:', token.accessTokenExpires);
			// console.log('token antes:', token);
			const expiredDay = new Date(token.accessTokenExpires);
			// console.log('expired:', expiredDay);
			if (actuallyDay < expiredDay) {
				return token;
			}

			return signOut();
		},
	},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
