/** @type {import('tailwindcss').Config} */
const path = require('path');
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./*/*.html', './**/*.html', './**/*.hbs', './src/css/*.css', './src/js/**/*.js', './main.js'],
	safelist: [
		{
			pattern: /left-(2|4|6|8|10|12|14)/,
		},
		{
			pattern: /top-(1|2|3|4|5|6|7|8)/,
		},
		{
			pattern: /bottom-(1|2|3|4|5|6|7|8)/,
		},
	],
	theme: {
		container: {
			center: true,
		},
		fontFamily: {
			'roboto': ['Roboto Condensed', 'sans-serif'],
			'proxima-cond': ['Proxima Nova Cond', 'sans-serif'],
			'icon': "'styzzo' !important",
		},
		extend: {
			screens: {
				'xs': '375px',
				...defaultTheme.screens,
			},
			colors: {
				'core-black': {
					DEFAULT: '#090911'
				}
			},
			animation: {
				'spin-5x': 'spin 5s linear infinite',
				'spin-6x': 'spin 6s linear infinite',
				'spin-7x': 'spin 7s linear infinite',
				'spin-8x': 'spin 8s linear infinite',
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		require('tailwind-container-break-out'),
		plugin(function ({ addBase }) {
			addBase({
				'@font-face': {
					fontFamily: 'styzzo',
					src: `
						url('./icons/fonts/styzzo.woff') format('woff'),
						url('./icons/fonts/styzzo.svg') format('svg'),
						url('./icons/fonts/styzzo.ttf') format('truetype')
					`,
					'font-weight': 'normal',
					'font-style': 'normal',
					'font-display': 'swap',
				},
			});
		}),
	],
}
