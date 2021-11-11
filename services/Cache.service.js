import fs from 'fs'
class CacheService {
    constructor() {
        this.cacheUrl = '.cache/'
        if (!fs.existsSync(this.cacheUrl)){
            fs.mkdirSync(this.cacheUrl);
        }
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
