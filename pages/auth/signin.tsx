import * as React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Typography } from 'components/common/typography';
import { Button } from 'components/common/button/button';
import { InputPassword } from 'components/common/form/input-password';
import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { Logo } from 'components/logo';
import { GetServerSideProps } from 'next';
import { InputEmail } from 'components/common/form/input-email';
import { Icons } from 'consts/icons';

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
		watch,
	} = useForm({ mode: 'onChange' });

	const router = useRouter();
	const { addToast } = useToasts();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleSubmitData = (data: any) => {
		setIsLoading(true);

		signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
			callbackUrl: '/dashboard',
		})
			.then((response) => {
				if (response?.error) {
					addToast(response.error, { appearance: 'error' });
				} else {
					router.push('/dashboard');
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const rules = {
		email: {
			required: { value: true, message: 'This is required' },
		},
		password: {
			required: { value: true, message: 'This is required' },
		},
		check: {},
	};

	return (
		<>
			<div className="container-auth bg-primary">
				<div className="rounded-2xl center flex flex-col items-center justify-center box w-full m-auto bg-white">
					<Logo
						className="mb-4"
						type="withColor"
						classNameImg="max-w-[302px]"
					/>
					<Typography
						type="title"
						className="mb-9 f-36 font-normal text-gray-500 mt-10"
					>
						Ingresa tus datos
					</Typography>
					{/* <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL}</p>
					<p>NEXTAUTH_URL publuc: {process.env.NEXT_PUBLIC_AUTH_URL}</p>
					<p>API: {process.env.NEXT_PUBLIC_API}</p> */}
					<form
						className="w-full text-left"
						onSubmit={handleSubmit(handleSubmitData)}
					>
						<InputEmail
							name="email"
							title="Correo electr??nico"
							isFill={!!watch('email')}
							register={register}
							rules={rules.email}
							error={errors.email}
							leftImg={Icons.user}
							className="mb-3 md:mb-5"
						/>
						<InputPassword
							name="password"
							title="Contrase??a"
							isFill={!!watch('password')}
							validate={false}
							register={register}
							rules={rules.password}
							error={errors.password}
							leftImg={Icons.locked}
						/>
						<Typography
							type="caption"
							className="mb-3 text-right f-18 font-normal text-gray-500"
						>
							??Olvidaste tu contrase??a?
							<Link href="/auth/forgot-password">
								<span className="text-primary cursor-pointer font-bold f-18">
									{' '}
									Recup??rala
								</span>
							</Link>
						</Typography>
						<div className="flex items-center justify-center mt-9 w-full">
							<Button
								labelProps="f-24 font-normal"
								label={isLoading ? 'Iniciar Sesi??n' : 'Iniciar Sesi??n'}
								fill
								loading={isLoading}
								boderRadius="rounded-full"
								size="full"
								type="submit"
								disabled={!isDirty || !isValid || !!isLoading}
							/>
						</div>
					</form>
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

export default SignIn;
