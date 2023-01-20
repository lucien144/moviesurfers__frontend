const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: { 'sans': ['"Noto Sans"', ...defaultTheme.fontFamily.sans] },
			colors: {
				'film': '#3976F0',
				'serial': '#39F084',
				'hry': '#B339F0',
				'kultovky': '#F0394F',
			},
			spacing: {
				'0': '0',
				'2': '2px',
				'4': '4px',
				'8': '8px',
				'16': '16px',
				'32': '32px',
				'64': '64px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
