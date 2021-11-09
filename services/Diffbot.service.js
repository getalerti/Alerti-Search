import env from '../env'

class DiffbotService {
    constructor() {
        if (!env.diffbot_token || !env.diffbot_url) {
            throw 'Empty Diffbot params'
        }
        this.url = `${env.diffbot_url}?&token=${env.diffbot_token}&url=`
    }
    request = function (url) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(this.url + url, requestOptions)
    }
}

export default DiffbotService
