/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
	plugins: [
		require('postcss-simple-vars'),
		require('postcss-import'),
		require('postcss-nesting'),
		require('tailwindcss/nesting')(require('postcss-nesting')),
		require('tailwindcss'),
		require('autoprefixer'),
		require('postcss-preset-env')({
			features: {
				'nesting-rules': false
			}
		}),
	]
};