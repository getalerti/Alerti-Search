export default {
    meilisearchUrl:         process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://127.0.0.1:7700',
    meilisearchMasterKey:   process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || 'masterKey',
    meilisearchDocument:    process.env.NEXT_PUBLIC_MEILISEARCH_DEFAULT_DOCUMENT_NAME || 'points'
}
