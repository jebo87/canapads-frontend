const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
module.exports = withImages(
	withCSS(
		withSass({
			webpack(config, options) {
				return config;
			},
			// env: {
			// 	REACT_APP_API_URL: process.env.REACT_APP_API_URL
			// }
			serverRuntimeConfig: {
				// Will only be available on the server side
				mySecret: 'secret'
			},
			publicRuntimeConfig: {
				// Will be available on both server and client
				REACT_APP_API_URL: process.env.REACT_APP_API_URL
			}
		})
	)
);
