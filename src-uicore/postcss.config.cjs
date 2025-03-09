/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
	plugins: [
		require('@tailwindcss/postcss'),
		require('autoprefixer'),
		require('postcss-preset-env')({
			features: {
				'nesting-rules': false
			}
		}),
	]
};