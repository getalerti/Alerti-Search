import env from '../env'
class AlertiLeadsService {
    constructor() {
        if (!env.alerti_leads_api_key || !env.alerti_leads_url) {
            throw 'Empty Alerti Leads params'
        }
        this.headers = new Headers()
        this.headers.append("Content-Type", "application/json")
    }
    retrieveSocialMedia = (url) => {
        var raw = JSON.stringify({
            api_key: env.alerti_leads_api_key,
            url
        })
        var requestOptions = {
        method: 'POST',
        headers: this.headers,
        body: raw,
        redirect: 'follow'
        }
        
        return fetch(`${env.alerti_leads_url}/incoming-webhook/extract-emails-from-urls`, requestOptions)
    }
}

export default AlertiLeadsService
