const withImages = require('next-images')
module.exports = {
    ...withImages(),
    env: {
        meilisearchUrl:         process.env.MEILISEARCH_URL || 'http://127.0.0.1:7700',
        meilisearchMasterKey:   process.env.MEILISEARCH_MASTER_KEY || 'masterKey',
        meilisearchDocument:    process.env.MEILISEARCH_DEFAULT_DOCUMENT_NAME || 'points'
    },
}
