import env from '../env'
import { stringToSlug } from '../helpers/functions'
import Company from '../models/Contact'

class GoogleSheetService {
    constructor() {
        if (!env.google_sheet_id || !env.google_api_token) {
            throw 'Empty Google Sheet params'
        }
        this.url = `https://sheets.googleapis.com/v4/spreadsheets/${env.google_sheet_id}/?key=${env.google_api_token}&includeGridData=true`
    }
    request =  async (mandatoryField, tabIndex = 0) => {
        try {
            const { sheets } = await (await fetch(this.url)).json()
            const values = sheets[tabIndex].data[0].rowData
            const titles = values[0].values.map(value => value.formattedValue)

            const companies = []
            values.forEach((element, index) => {
                if (index == 0) return;
                const companyObj = { ...Company }
                companyObj['id'] = index
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
                await(await fetch('/api/import-businesses', requestOptions)).json()
            })
        } catch (error) {
            console.log({GoogleSheetServiceError: error})
            throw JSON.stringify(error)
        }
    }
}

export default GoogleSheetService