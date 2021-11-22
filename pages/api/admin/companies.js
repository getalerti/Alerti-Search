import Company from "../../../models/Company"
import Cors from "../../../security/Cors"
import SupabaseService from "../../../services/Supabase.service"
const service = new SupabaseService()

const validation = (entity) => {
  Object.keys(entity).forEach(key => {
    if(Object.keys(Company).indexOf(key) === -1)
      throw 'Invalid field' + key
  })
}
const search = async (query, limit) => {
  return await service.search(query, limit)
}
const insert = async (body) => {
  validation(body)
  return await service.insert(body)
}
const update = async (id, body) => {
  validation(body)
  return await service.update(id, body)
}
const remove = async (id) => {
  return await service.remove(id)
}

export default async function handler(req, res) {
  await Cors(req, res)
  const query = req.query.s || ''
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 20
  let results = []
  try {
    switch (req.method) {
      // insert
      case 'POST':
        const insertResult = await insert(JSON.parse(req.body)) 
        if (insertResult.error) {
          console.log({insertError: insertResult.error})
          throw 'Error inserr'
        }
        break;

      // search
      case 'GET':
        if (query === '')
          throw 'Empty query'
        const searchResult = await search(query, limit)
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
        if (deleteResult.error) {
          console.log({deleteError: deleteResult.error})
          throw 'Error delete'
        }
        break;
      default:
        throw 'Technical error'
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error
    })
  }
  return res.status(200).json({
    success: true,
    results
  })
}