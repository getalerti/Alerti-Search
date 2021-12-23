import { makeid, stringToSlug } from "../../../helpers/functions"
import apifyMapping from "../../../mappings/apifyMapping"
import AdminCors from "../../../security/AdminCors"
import ApifyService from "../../../services/Apify.service"
import SupabaseService from "../../../services/Supabase.service"
const service = new SupabaseService()
const apifyService = new ApifyService()
// import dump from './../../../helpers/dump.json'

const getCompanies = async (spreadsheetId, session) => {
  const result = await (await apifyService.companiesFromSpreadsheet(session, spreadsheetId)).json()
  if (result.length) {
    return result
  }
  return null
}
export default async function handler(req, res) {
  await AdminCors(req, res)
  try {
    const { spreadsheetId, session } = req.query
    if (!spreadsheetId || !session) throw 'Empty params'
    const companies = await getCompanies(spreadsheetId, session)
    // const companies = dump
    if (!companies) throw 'Error while parsing the spreadsheet, please check the apify run logs.'
    const updatedCompanies = []
    for (let index = 0; index < companies.length; index++) {
      let company = apifyMapping(companies[index])
      if (!company.linkedIn_url || !company.name)
        continue
      const { error, data } = await service.companyByLinkedinUrl(company.linkedIn_url.replace('https://', '').replace('http://', ''))
      if (!error && data && data.length) {
        company = {...data[0], ...company}
      }
      else {
        company.id_alerti = makeid('cmp_')
        company.slug = stringToSlug(company.name)
        company.source = 'googleSpreadsheet'
      }
      company.is_verified = true
      company.syncronized = false
      
      await service.update(company.id, company)
      console.log('updated / created company : ' + company.name + company.is_verified)
      updatedCompanies.push(company.name)
    }
    await service.log(req.user, 'UPDATE_LINKEDIN', updatedCompanies.join(' , ') ,JSON.stringify(req.query))
  } catch (error) {
    await service.log(req.user, 'ERROR_LINKEDIN', JSON.stringify(error), null)
    return res.status(401).json({
      success: false,
      message: error + ''
    })
  }
  return res.status(200).json({
    success: true,
  })
}