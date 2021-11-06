import * as React from 'react';
import { Typography } from 'components/common/typography';
import { FirstForm, SecondForm } from 'components/auth/forgot-password';
import { useRouter } from 'next/router';
import { Logo } from 'components/logo';
import { useToasts } from 'react-toast-notifications';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

const ForgotPassword = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSecondStep, setIsSecondStep] = React.useState(false);
	const { addToast } = useToasts();

	const onSubmitFirstForm = async () => {
		setIsLoading(true);
		setIsSecondStep(true);
		setIsLoading(false);
	};

	const onSubmitSecondForm = async () => {
		setIsLoading(true);
		addToast('Congrats! you changed your password', {
			appearance: 'success',
		});
		router.push('/auth/signin');
		setIsLoading(false);
	};

	const subTitle = React.useMemo(() => {
		return isSecondStep
			? 'Ingresa tu nueva contraseña'
			: 'Ingresa el correo electrónico para recuperar tu cuenta';
	}, [isSecondStep]);

	return (
		<>
			<div className="container-auth bg-primary">
				<div className="rounded-2xl center flex flex-col items-center justify-center text-left box w-full m-auto bg-white">
					<Logo
						className="mb-4"
						type="withColor"
						classNameImg="max-w-[302px]"
					/>
					<Typography
						type="title"
						className="mb-9 f-36 font-normal text-gray-500 mt-10 leading-tight"
					>
						{subTitle}
					</Typography>

					{!isSecondStep ? (
						<FirstForm
							onHandleSubmit={onSubmitFirstForm}
							isLoading={isLoading}
						/>
					) : (
						<SecondForm
							onHandleSubmit={onSubmitSecondForm}
							isLoading={isLoading}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (session && session.accessToken) {
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};

export default ForgotPassword;
