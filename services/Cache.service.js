import fs from 'fs'
import env from '../env'
class CacheService {
    constructor() {
        this.cacheUrl = env.cache_url
        
    }
    save = (key, content) => {
        fs.writeFileSync(this.cacheUrl + key,
            content,
            'utf8'
          )
    }
    get = (key) => {
        return fs.readFileSync(this.cacheUrl + key, 'utf8')
    }
}

export default CacheService
