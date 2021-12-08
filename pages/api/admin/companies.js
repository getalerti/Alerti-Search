import { makeid, stringToSlug } from "../../../helpers/functions"
import apifyMapping from "../../../mappings/apifyMapping"
import Company from "../../../models/Company"
import AdminCors from "../../../security/AdminCors"
import ApifyService from "../../../services/Apify.service"
import SupabaseService from "../../../services/Supabase.service"
const service = new SupabaseService()
const apifyService = new ApifyService()

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

export default async function handler(req, res) {
  await AdminCors(req, res)
  const { s, from, to, verified} = req.query
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 20
  let results = []
  try {
    switch (req.method) {
      // insert
      case 'POST':
        const { pageUrl, session, company } = JSON.parse(req.body)
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