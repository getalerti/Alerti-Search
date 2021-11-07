import { MeiliSearch } from 'meilisearch'
import env from '../env'

class MeiliSearchService {
    constructor() {
        if (!env.meilisearchUrl || !env.meilisearchMasterKey) {
            throw 'Empty meilisearch params'
        }
        try {
            this.meilisearchClient = new MeiliSearch({
                host: env.meilisearchUrl,
                apiKey: env.meilisearchMasterKey,
            })
            this.meilisearchIndex = this.meilisearchClient.index(env.meilisearchDocument)
        } catch(error) {
            console.log({MeiliSearchServiceError: error})
        }
    }
    search = function (query) {
        return this.meilisearchIndex.search(query)
    }
    insert = function (documents) {
        return this.meilisearchIndex.addDocuments(documents)
    }
    find = async function (id) {
        return await this.meilisearchIndex.getDocument(id)
    }
}

export default MeiliSearchService
