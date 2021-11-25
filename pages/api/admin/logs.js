import AdminCors from "../../../security/AdminCors"
import SupabaseService from "../../../services/Supabase.service"
const service = new SupabaseService()

const search = async (query, operation, exist, range) => {
  return await service.searchLogs(query, operation, exist, range)
}

export default async function handler(req, res) {
  await AdminCors(req, res)
  const query = req.query.s || ''
  const operation = req.query.operation || null
  const exist = req.query.exist || false
  const range = req.query.range || 20
  let results = []
  try {
    switch (req.method) {
      // search
      case 'GET':
        if (query === '' && !operation)
          throw 'Empty query'
        const searchResult = await search(query, operation, exist, range)
        if (searchResult.error) {
          console.log({searchLogsError: searchResult.error})
          throw 'Error search logs'
        }
        results = searchResult.data
        break;
      default:
        throw 'Technical error'
    }
  } catch (error) {
    await service.log(req.user, 'ERROR_CHECKING_LOGS', JSON.stringify(error), null)
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