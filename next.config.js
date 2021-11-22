const withImages = require('next-images')
module.exports = {
    ...withImages(),
	async redirects() {
		return [
			{
			source: '/admin',
			destination: '/admin/companies',
			permanent: true,
			},
		]
	},
    api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	}
}
