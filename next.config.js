const withImages = require('next-images')
module.exports = {
    ...withImages(),
    api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	}
}
