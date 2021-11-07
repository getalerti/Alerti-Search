import env from '../env'

class DataforseoService {
    constructor() {
        if (!env.dataforseo_token || !env.dataforseo_token) {
            throw 'Empty dataforseo params'
        }
        try {
            this.headers = new Headers()
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('Authorization', 'Basic ' + env.dataforseo_token);
        } catch(error) {
            console.log({DataforseoServiceError: error})
        }
    }
    request = function (query, lang = 'fr', location_code = 2250) {
        var raw = JSON.stringify([
            {
              'keyword': encodeURI(query),
              'location_code': location_code,
              'language_code': lang,
              'depth': 10
            }
          ])
          var requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: raw,
            redirect: 'follow'
          }
          return fetch(env.dataforseo_url, requestOptions)
    }
}

export default DataforseoService
