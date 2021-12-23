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

    companiesFromSpreadsheet = (session, spreadsheet) => {
        const url = this.apifyActorUrl('seaicm~linkedin-profile-company-spreadsheet')
        var raw = JSON.stringify(
            {
                spreadsheetId: spreadsheet,
                publicSpreadsheet: true,
                cookiessession: session,
                proxyConfig: {
                    useApifyProxy: true,
                    apifyProxyGroups: [
                        "RESIDENTIAL"
                    ]
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

    tweets = (twitterUri) => {
        const url = this.apifyActorUrl('vdrmota~twitter-scraper')
        var raw = JSON.stringify(
            {
                searchMode: 'live',
                mode: 'own',
                tweetsDesired: 12,
                addUserInfo: true,
                startUrls: [
                    {
                        url: twitterUri,
                        method: 'GET'
                    }
                ],
                proxyConfig: {
                    useApifyProxy: true
                },
                debugLog: false
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



/*

------------------------------------------------------------------------------------------------------------------------------------------------------------
1- LUNCH

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "searchMode": "live",
  "mode": "own",
  "tweetsDesired": 12,
  "addUserInfo": true,
  "startUrls": [
    {
      "url": "https://twitter.com/youssame0",
      "method": "GET"
    }
  ],
  "proxyConfig": {
    "useApifyProxy": true
  },
  "debugLog": false
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.apify.com/v2/acts/vdrmota~twitter-scraper/runs?token=apify_api_2WijclSIeu0m7sajIS1pa3Ll3k50nV0URH9B", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));




------------------------------------------------------------------------------------------------------------------------------------------------------------


2- CHECK STATUS
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "searchMode": "live",
  "mode": "own",
  "tweetsDesired": 12,
  "addUserInfo": true,
  "startUrls": [
    {
      "url": "https://twitter.com/youssame0",
      "method": "GET"
    }
  ],
  "proxyConfig": {
    "useApifyProxy": true
  },
  "debugLog": false
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.apify.com/v2/acts/vdrmota~twitter-scraper/runs/[data.id]?token=apify_api_2WijclSIeu0m7sajIS1pa3Ll3k50nV0URH9B", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


------------------------------------------------------------------------------------------------------------------------------------------------------------

3- IF "data.status": "SUCCEEDED"

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "searchMode": "live",
  "mode": "own",
  "tweetsDesired": 12,
  "addUserInfo": true,
  "startUrls": [
    {
      "url": "https://twitter.com/youssame0",
      "method": "GET"
    }
  ],
  "proxyConfig": {
    "useApifyProxy": true
  },
  "debugLog": false
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.apify.com/v2/datasets/[data.defaultDatasetId]/items?token=apify_api_2WijclSIeu0m7sajIS1pa3Ll3k50nV0URH9B", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



*/