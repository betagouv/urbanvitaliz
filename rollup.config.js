import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const plugins = cssFileName => [
	svelte({
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
	!production && livereload('_site'),

	// If we're building for production (npm run build
	// instead of npm run dev), minify
	production && terser()
]

const watch = {
	clearScreen: false
}


export default [
	{
		input: 'scripts/assistant.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'build/assistant.rollup.js'
		},
		plugins: plugins('build/assistant.rollup.css'),
		watch
	},
	// legacy projects; may be removed eventually
	/*{
		input: 'scripts/description-friche.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'build/description-friche.rollup.js'
		},
		plugins: plugins('build/description-friche.rollup.css'),
		watch
	},*/
	{
		input: 'scripts/spa-main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'build/spa.rollup.js'
		},
		plugins: plugins('build/spa.rollup.css'),
		watch
	}
]
