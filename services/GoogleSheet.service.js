import env from '../env'
import { makeid, stringToSlug, sleep } from '../helpers/functions'
import Company from '../models/Contact'

class GoogleSheetService {
    constructor() {
        if (!env.google_sheet_id || !env.google_api_token) {
            throw 'Empty Google Sheet params'
        }
        this.url = `https://sheets.googleapis.com/v4/spreadsheets/${env.google_sheet_id}/?key=${env.google_api_token}&includeGridData=true`
    }
    customUrl = (spreadsheetID) => {
        return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/?key=${env.google_api_token}&includeGridData=true`
    }
    rowUrl = (spreadsheetID, line) => {
        return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${line}:${line}/?key=${env.google_api_token}`
    }
    rowsUrl = (spreadsheetID, from, to) => {
        return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${from}:${to}/?key=${env.google_api_token}`
    }
    titlesUrl = (spreadsheetID) => {
        return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/1:1/?key=${env.google_api_token}`
    }
    getTitles = async (spreadsheetID) => {
        try {
            const { values } = await (await fetch(this.titlesUrl(spreadsheetID))).json()
            const titles = values[0]
            const titlesObs = {
                verified: false
            }
            titles.forEach(title => {
                if (title !== undefined && title !== "undefined")
                    titlesObs[title] = ''
            })
            return {
                titles: titlesObs,
            }
        } catch (error) {
            console.log({GoogleSheetServiceError: error})
            throw JSON.stringify(error)
        }
    }
    getCompanies = async (spreadsheetID) => {
        try {
            const { sheets } = await (await fetch(this.customUrl(spreadsheetID))).json()
            const values = sheets[0].data[0].rowData
            const titles = values[0].values.map(value => value.formattedValue)
            const companies = []
            values.forEach((element, index) => {
                if (index == 0) return;
                const company = {}
                titles.forEach((title, index) => {
                    company[title] = element.values && element.values[index]? (element.values[index].formattedValue || null) : null
                })
                companies.push(company)
            }) 
            return companies
        } catch (error) {
            console.log({GoogleSheetServiceError: error})
            throw JSON.stringify(error)
        }
    }

    getRow = async (spreadsheetID, row) => {
        try {
            let resValues = await (await fetch(this.rowUrl(spreadsheetID, row))).json()
            let titles = await (await fetch(this.titlesUrl(spreadsheetID))).json()
            if (titles.error && titles.error.status == 'RESOURCE_EXHAUSTED') {
                console.log('SLEEP')
                await sleep(65000)
                console.log('CONTINUE SLEEP')
                titles = await (await fetch(this.titlesUrl(spreadsheetID))).json()
            }
            if (resValues.error && resValues.error.status == 'RESOURCE_EXHAUSTED') {
                console.log('SLEEP')
                await sleep(65000)
                console.log('CONTINUE')
                resValues = await (await fetch(this.rowUrl(spreadsheetID, row))).json()
            }
            let values = resValues.values
            if (!values || !values[0])
                return null
            values = values[0]
            titles = titles.values[0]
            const company = {}
            values.forEach((element, index) => {
                company[titles[index]] = element
            }) 
            return company
        } catch (error) {
            console.log({GoogleSheetServiceError: error})
            throw JSON.stringify(error)
        }
    }
    getRows = async (spreadsheetID, from, to) => {
        try {
            let resValues = await (await fetch(this.rowsUrl(spreadsheetID, from, to))).json()
            let titles = await (await fetch(this.titlesUrl(spreadsheetID))).json()
            /* if (titles.error && titles.error.status == 'RESOURCE_EXHAUSTED') {
                console.log('SLEEP')
                await sleep(65000)
                console.log('CONTINUE SLEEP')
                titles = await (await fetch(this.titlesUrl(spreadsheetID))).json()
            }
            if (resValues.error && resValues.error.status == 'RESOURCE_EXHAUSTED') {
                console.log('SLEEP')
                await sleep(65000)
                console.log('CONTINUE')
                resValues = await (await fetch(this.rowUrl(spreadsheetID, row))).json()
            } */
            let values = resValues.values
            if (!values || !values[0])
                return null
            titles = titles.values[0]
            const companies = []
            values.forEach(value => {
                const company = {}
                value.forEach((element, index) => {
                    company[titles[index]] = element
                }) 
                companies.push(company)
            })
            return companies
            
        } catch (error) {
            console.log({GoogleSheetServiceError: error})
            throw JSON.stringify(error)
        }
    }
    request =  async (mandatoryField, tabIndex = 0) => {
        try {
            const { sheets } = await (await fetch(this.url)).json()
            const values = sheets[tabIndex].data[0].rowData
            let titles = values[0].values.map(value => value.formattedValue)
            const companies = []
            values.forEach((element, index) => {
                if (index == 0) return;
                const companyObj = { ...Company }
                companyObj['id'] = makeid('comp')
                titles.forEach((title, index) => {
                    companyObj[title] = element.values && element.values[index]? (element.values[index].formattedValue || '-') : ''
                })
                if (!companyObj[mandatoryField] || companyObj[mandatoryField] == '')
                    return;
                companyObj['slug'] = stringToSlug(companyObj.name)
                companies.push(companyObj)
            })
            companies.forEach(async (company) => {
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(company)
                }
                const {success, error, results} = await (await wrapAdminFetch(`/api/admin/import-businesses${query}`, null, 'GET')).json()
            })
        } catch (error) {
            console.log({GoogleSheetServiceError: error})
            throw JSON.stringify(error)
        }
    }
}

export default GoogleSheetService
