import env from '../env'
import { makeid, stringToSlug } from '../helpers/functions'
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
    getTitles = async (spreadsheetID) => {
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
            const titlesObs = {}
            titles.forEach(title => {
                titlesObs[title] = ''
            })
            return {
                titles: titlesObs,
                companies
            }
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
