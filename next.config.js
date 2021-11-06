const path = require('path');
const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development',
	},
	future: {
		webpack5: false,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
});
