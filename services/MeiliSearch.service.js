
import { MeiliSearch } from 'meilisearch'
import env from '../env'

class MeiliSearchService {
    constructor(index = null) {
        if (!env.meilisearchUrl || !env.meilisearchMasterKey) {
            throw 'Empty meilisearch params'
        }
        this.headers = new Headers();
        this.headers.append("X-Meili-Api-Key", env.meilisearchMasterKey);
        this.headers.append("Content-Type", "application/json");
        this.basedUrl = `${env.meilisearchUrl}/indexes/${index ? index : env.meilisearchDocument}`;
    }
    request = (method, url = '', body = null) => {
        const requestOptions = {
            method: method,
            headers: this.headers,
            redirect: 'follow'
        };
        if (body) {
            const raw = JSON.stringify(body);
            requestOptions['body'] = raw
        }
        return fetch(this.basedUrl + url, requestOptions)
    }
    
}

export default MeiliSearchService
