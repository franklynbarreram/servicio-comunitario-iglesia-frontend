import { Icons } from 'consts/icons';
import { appRouter } from 'consts/router';

export const navigation = [
	{
		id: '1',
		label: 'Dashboard',
		subNavigation: [
			{
				name: 'cards',
				label: 'Mis tarjetas',
				href: `${appRouter.dashboard.href}`,
				icon: Icons.card,
			},
		],
	},
	{
		id: '2',
		label: 'Productos',
		subNavigation: [
			{
				name: 'products',
				label: 'Comprar productos',
				href: `${appRouter.dashboard.href}/${appRouter.dashboard.cards.href}`,
				icon: Icons.cardPay,
			},
			{
				name: 'payments',
				label: 'Pagos y recargas',
				href: `${appRouter.dashboard.href}/${appRouter.dashboard.cards.href}`,
				icon: Icons.payment,
			},
		],
	},
	{
		id: '3',
		label: 'Sobre nosotros',
		subNavigation: [
			{
				name: 'faq',
				label: 'FAQ',
				href: `${appRouter.dashboard.href}/${appRouter.dashboard.cards.href}`,
				icon: Icons.faq,
			},
			{
				name: 'support',
				label: 'Soporte técnico',
				href: `${appRouter.dashboard.href}/${appRouter.dashboard.cards.href}`,
				icon: Icons.support,
			},
			{
				name: 'terms',
				label: 'Terminos y condiciones',
				href: `${appRouter.dashboard.href}/${appRouter.dashboard.cards.href}`,
				icon: Icons.terms,
			},
			{
				name: 'security',
				label: 'Políticas de privacidad',
				href: `${appRouter.dashboard.href}/${appRouter.dashboard.cards.href}`,
				icon: Icons.security,
			},
		],
	},
];
