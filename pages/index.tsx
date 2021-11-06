import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

const Home = () => {
	return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session || !session?.accessToken) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}
	return {
		redirect: {
			destination: '/dashboard',
			permanent: false,
		},
	};
};

export default Home;
