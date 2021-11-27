import env from '../env'
class ApifyService {
    constructor() {
        if (!env.apify_token || !env.apify_url) {
            throw 'Empty Apify params'
        }
        this.headers = new Headers()
        this.headers.append("Content-Type", "application/json")
    }
    apifyActorUrl = (actor) => {
        return `${env.apify_url}${actor}/run-sync-get-dataset-items?token=${env.apify_token}`
    }
    addLinkedinCompany = (pageUrl, session) => {
        const url = this.apifyActorUrl('seaicm~linkedin-profile-company')
        var raw = JSON.stringify(
            {
                linkedinurl: pageUrl,
                cookiessession: session,
                proxyConfig: {
                    useApifyProxy: true,
                    apifyProxyGroups: [ "RESIDENTIAL" ]
                },
                debug: true
            })
          var requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: raw,
            redirect: 'follow'
          }
          return fetch(url, requestOptions)
    }
}

export default ApifyService
