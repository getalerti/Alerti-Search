import env from '../env'

class DiffbotService {
    constructor() {
        if (!env.diffbot_token || !env.diffbot_url || !env.diffbot_kg_url) {
            throw 'Empty Diffbot params'
        }
        this.baseUrl = env.diffbot_url
        this.kgUrl = env.diffbot_kg_url
    }
    buildUrl = (type) => `${this.baseUrl}${type}?&token=${env.diffbot_token}&url=`
    // 

    request = function (url, type = 'analyze') {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(this.buildUrl(type) + url, requestOptions)
    }
    customQuery = (type, industry, city, from, to) => {
        const query = `type:${type || 'type:Organization'} industries:"${industry}" location.city.name:"${city}" foundingDate<"${to}" foundingDate>"${from}"`
        const url = `${this.kgUrl}?type=query&token=${env.diffbot_token}&query=${encodeURI(query)}&size=100`
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(url, requestOptions)
    }
}

export default DiffbotService
