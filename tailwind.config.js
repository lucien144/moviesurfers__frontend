const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
			},
		},
		spacing: {
			'2': '2px',
			'4': '4px',
			'8': '8px',
			'16': '16px',
			'32': '32px',
			'64': '64px',
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
