import { makeid, stringToSlug } from "../../../helpers/functions"
import apifyMapping from "../../../mappings/apifyMapping"
import Company from "../../../models/Company"
import AdminCors from "../../../security/AdminCors"
import ApifyService from "../../../services/Apify.service"
import GoogleSheetService from "../../../services/GoogleSheet.service"
import SupabaseService from "../../../services/Supabase.service"
const service = new SupabaseService()
const apifyService = new ApifyService()
const googleService = new GoogleSheetService()

const validation = (entity) => {
  Object.keys(entity).forEach(key => {
    if(Object.keys(Company).indexOf(key) === -1)
      throw 'Invalid field' + key
  })
}
const search = async (query, limit, filters) => {
    return await service.search(query, limit, filters)
}
const insert = async (url, session, company = null) => {
  const result = await (await apifyService.addLinkedinCompany(url, session)).json()
  if (company) {
    if (!company.name || !company.website)
      throw 'invalid company name or webiste'
    company.id_alerti = makeid('cmp_')
    company.slug = stringToSlug(company.name)
    company.source = 'apify'
    return await service.insert(company)
  }
  if (result.length && result[0].companyUrl) {
    const company = apifyMapping(result[0]) || {}
    if (!company.name || !company.website)
      throw 'invalid company name or webiste'
    company.id_alerti = makeid('cmp_')
    company.slug = stringToSlug(company.name)
    company.source = 'apify'
    return await service.insert(company)
  }
  throw 'technical error'
}
const update = async (id, body) => {
  validation(body)
  return await service.update(id, body)
}
const remove = async (id) => {
  return await service.remove(id)
}
const spreadsheetInsert = async (mapping, spreadsheetId) => {
  const companies = await googleService.getCompanies(spreadsheetId)
  const done = []
  for (let index = 0; index < companies.length; index++) {
    const _company = companies[index];
    const company = {}
    Object.keys(_company).forEach(key => {
        const index = mapping[key]
        if (index !== '') {
            company[index] = _company[key]
        }
    })
    if (company.name){
      company.id_alerti = makeid('cmp_')
      company.slug = stringToSlug(company.name)
      company.source = 'googleSpreadsheet'
      await service.insert(company)
      done.push(company.name)
    }
  }
  return done
}

export default async function handler(req, res) {
  await AdminCors(req, res)
  const { s, from, to, verified} = req.query
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 20
  let results = []
  try {
    switch (req.method) {
      // insert
      case 'POST':
        const { pageUrl, session, company, source, mapping, spreadsheetId } = JSON.parse(req.body)
        if (source === 'spreadsheet' && mapping && spreadsheetId) {
          results = await spreadsheetInsert(mapping, spreadsheetId)
          await service.log(req.user, 'SPREADSHEET_INSERT_COMPANY', JSON.stringify(req.body), null)
          break;
        }
        if (!company && (!pageUrl || !session)) throw 'Invalid page Url or session'
        const insertResult = await insert(pageUrl, session, company)
        await service.log(req.user, 'INSERT_COMPANY', JSON.stringify(req.body), null)
        if (insertResult.error) {
          console.log({insertError: insertResult.error})
          throw insertResult.error
        }
        break;

      // search
      case 'GET':
        if (!s && !from && !to && !verified)
          throw 'Empty query'
        const searchResult = await search(s, limit, {from, to, verified})
        if (searchResult.error) {
          console.log({searchError: searchResult.error})
          throw 'Error search'
        }
        results = searchResult.data
        break;
      
      // update
      case 'PUT':
        if (req.query.id === '')
          throw 'Empty id'
        const updateResult = await update(req.query.id, JSON.parse(req.body))
        await service.log(req.user, 'UPDATE_COMPANY', JSON.stringify(req.body), null)
        if (updateResult.error) {
          console.log({updateError: updateResult.error})
          throw 'Error update'
        }
        break;
      
      // delete
      case 'DELETE':
        if (req.query.id === '')
          throw 'Empty id'
        const deleteResult = await remove(req.query.id)
        await service.log(req.user, 'UPDATE_COMPANY', JSON.stringify({id: req.query.id}), null)
        if (deleteResult.error) {
          console.log({deleteError: deleteResult.error})
          throw 'Error delete'
        }
        break;
      default:
        throw 'Technical error'
    }
  } catch (error) {
    await service.log(req.user, 'ERROR_COMPANIES', JSON.stringify(error), null)
    return res.status(401).json({
      success: false,
      message: error + ''
    })
  }
  return res.status(200).json({
    success: true,
    results
  })
}