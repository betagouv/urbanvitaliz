import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';


import { scss } from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

const plugins = cssFileName => [
	svelte({
		preprocess: [scss()],
		// enable run-time checks when not in production
		dev: !production,
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css: css => {
			css.write(cssFileName);
		}
	}),

	// If you have external dependencies installed from
	// npm, you'll most likely need these plugins. In
	// some cases you'll need additional configuration -
	// consult the documentation for details:
	// https://github.com/rollup/plugins/tree/master/packages/commonjs
	resolve({
		browser: true,
		dedupe: ['svelte']
	}),
	commonjs(),

	// Watch the `_site` directory and refresh the
	// browser on changes when not in production
	// !production && livereload('_site'),

	// If we're building for production (npm run build
	// instead of npm run dev), minify
	production && terser()
]

const watch = {
	clearScreen: false
}


export default [
	{
		input: 'scripts/spa-main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			file: 'build/spa.rollup.js'
		},
		plugins: plugins('spa.rollup.css'),
		watch
	},
	{
		input: 'scripts/header-login.js',
		output: {
			sourcemap: true,
			format: 'iife',
			file: 'build/header-login.rollup.js'
		},
		plugins: plugins('header-login.rollup.css'),
		watch
	}
]
