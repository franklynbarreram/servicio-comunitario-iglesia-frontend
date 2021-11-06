import * as React from 'react';
import type { AppProps } from 'next/app';
import clsx from 'clsx';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'next-auth/client';
import { ThemeContext, ThemeType } from 'context';
import { QueryClientProvider, QueryClient } from 'react-query';
import 'styles/global-tailwind.css';
import 'styles/globals.scss';
import 'styles/fonts.scss';
import 'styles/styles-ant.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const [theme, setTheme] = React.useState<ThemeType>('light');
	const queryClientRef = React.useRef<QueryClient | null>(null);

	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}

	return (
		<Provider session={pageProps.session}>
			<QueryClientProvider client={queryClientRef.current}>
				<ToastProvider autoDismiss placement="top-center">
					<ThemeContext.Provider value={{ theme, setTheme }}>
						<div
							className={clsx(
								'font-montserrat min-h-screen text-gray-800',
								'transition-colors duration-1000',
								theme
							)}
						>
							<Component {...pageProps} />
						</div>
					</ThemeContext.Provider>
				</ToastProvider>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
