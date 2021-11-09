export default {
    meilisearchUrl:         process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://127.0.0.1:7700',
    meilisearchMasterKey:   process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || 'masterKey',
    meilisearchDocument:    process.env.NEXT_PUBLIC_MEILISEARCH_DEFAULT_DOCUMENT_NAME || 'points',
    dataforseo_token:       process.env.NEXT_PUBLIC_DATAFORSEO_TOKEN || '',
    dataforseo_url:         process.env.NEXT_PUBLIC_DATAFORSEO_URL || '',
    authorized_origins:     process.env.NEXT_PUBLIC_AUTHORIZED_ORIGINS || '',
    diffbot_token:          process.env.NEXT_PUBLIC_DIFFBOT_TOKEN || '',
    diffbot_url:            process.env.NEXT_PUBLIC_DIFFBOT_URL || '',

}
