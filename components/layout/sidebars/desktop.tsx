import React, { Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Typography } from 'components/common/typography';
import { useRouter } from 'next/router';
import { navigation } from 'consts/navigation';
import { Icons } from 'consts/icons';
import { signOut } from 'next-auth/client';
import { Images } from 'consts';

interface LayoutDashboardProps {}
export const SidebarDesktop: React.FC<LayoutDashboardProps> = () => {
	return (
		<>
			{/*  Sidebar desktop */}
			<div className="hidden md:flex md:flex-shrink-0 bg-primary">
				<div className="flex flex-col flex-auto">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex flex-col h-0 flex-1">
						<div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto scroll-custom">
							<div className="flex items-center flex-shrink-0 px-7">
								<Link href="/">
									<a
										className={clsx(
											'cursor-pointer flex items-center justify-center'
										)}
									>
										<img
											className="max-w-[244px]"
											src={Images.logoWithColor}
											alt=""
										/>
									</a>
								</Link>
							</div>
							<nav className="mt-5 flex-1 px-7">
								{navigation.map((item) => {
									const router = useRouter();
									return (
										<Fragment key={'nav-desktop-' + item.id}>
											<p className="text-white f-18 font-semibold px-3 pt-7">
												{item.label}
											</p>
											{item.subNavigation.map((subItem) => {
												const active = router.pathname === subItem.href;
												return (
													<Link key={subItem.name} href={subItem.href}>
														<a
															className={clsx(
																active
																	? 'bg-active text-white font-bold opacity-100 '
																	: 'text-white hover:bg-active font-light  opacity-70',
																'group flex items-center px-3 pt-7 hover:opacity-90 text-base rounded-md f-18'
															)}
														>
															<img
																src={subItem.icon}
																className="mr-4 flex-shrink-0 h-6 w-6 text-white"
																aria-hidden="true"
															/>
															{subItem.label}
														</a>
													</Link>
												);
											})}
											<div className="divider mx-3 mt-7"></div>
										</Fragment>
									);
								})}
							</nav>
						</div>
						<div className="flex-shrink-0 flex border-t border-white px-7 py-4">
							<div className="flex-1 flex items-center px-3 cursor-pointer">
								<div
									className={clsx(
										'inline-flex items-center w-9 h-9 overflow-hidden'
									)}
								>
									<img
										src={Icons.logout}
										className="mr-4 flex-shrink-0 h-6 w-6 text-white"
										aria-hidden="true"
									/>
								</div>
								<Typography
									type="span"
									className="text-white font-semibold  f-18 "
									onClick={() => {
										signOut();
									}}
								>
									Salir del sistema
								</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
