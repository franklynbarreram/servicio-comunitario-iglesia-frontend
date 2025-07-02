import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'lib/helper';

const Home = () => {
	return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = getSession(context);
	if (!session || !session?.access_token) {
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
