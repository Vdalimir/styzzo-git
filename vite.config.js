import handlebars from 'vite-plugin-handlebars';
import macrosPlugin from 'vite-plugin-babel-macros';

import { svgImageItems } from './src/data/auctions.json';
import { svgImages } from './src/data/accordion.json';

const { resolve } = require('path');
const { defineConfig } = require('vite');

const partialDirectory = resolve(__dirname, 'src', 'partials');

const data = {
	svgImageItems,
	svgImages,
	icons: require('./icons/selection.json').icons,
};

const pageData = {
	'/ui.html': {
		title: 'Home Page',
		data: data,
		isHome: true,
	},
	'/index.html': {
		data: data
	},
	'/contacts.html': {
		data:data
	},
	'/projects.html': {
		data:data
	},
	'/services.html': {
		data:data
	},
	'/about.html': {
		data:data
	}
};

module.exports = defineConfig({
	plugins: [
		macrosPlugin(),
		handlebars({
			context(pagePath) {
				return pageData[pagePath];
			},
			helpers: {
				ifEquals: (arg1 , arg2, options) => {
					if(arg1 === arg2) {
						return options.fn(this);
					}
					return options.inverse(this);
				},
				getJsonContext: (data, options) => {
					return options.fn(JSON.parse(data));
				}
			},
			partialDirectory: [resolve(__dirname, 'src/partials'), resolve(__dirname, 'src/partials/includes'), resolve(__dirname, 'src/partials/components')]
		}),
	],
	resolve: {
		alias: {
			'tailwind.config.js': resolve(__dirname, 'tailwind.config.js'),
		},
	},
	optimizeDeps: {
		include: ['tailwind.config.js'],
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				contacts: resolve(__dirname, 'contacts.html'),
				projects: resolve(__dirname, 'projects.html'),
				services: resolve(__dirname, 'services.html'),
				about: resolve(__dirname, 'about.html')
			},
		},
		commonjsOptions: {
			include: [],
		},
	},
});
