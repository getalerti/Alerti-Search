import DataforseoService from '../../services/Dataforseo.service'
import MeiliSearchService from '../../services/MeiliSearch.service'
import cors from '../../security/Cors'

export default async function handler(req, res) {
  await cors(req, res)
  const service = new DataforseoService()
  const searchService = new MeiliSearchService()
  const query = req.query.s || ''
  const id = req.query.id || ''
  const lang = req.query.lang || Intl.DateTimeFormat().resolvedOptions().locale
  const location = req.query.location || 2250
  if (query === '' || lang === '' || id === '' )
    return res.status(201).json({
            success: false,
            message: 'Empty query'
          })
  // Intl.DateTimeFormat().resolvedOptions().locale
  let results = await (await service.request(query, lang, location)).json()
  if (!results || !results.tasks || !results.tasks[0].result[0].items) {
    return res.status(201).json({
            success: false,
            message: results.tasks ? (results.tasks[0].status_message || 'Unknown error') : 'Unknown error'
          })
  }
  results = results.tasks[0].result[0].items
  const body = [{
    id,
    articles: results
  }]
  await (await searchService.request('PUT', `/documents`, body)).json()
  return res.status(200).json({
            success: true,
            results
          })
}