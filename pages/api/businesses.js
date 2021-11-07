import MeiliSearchService from './../../services/MeiliSearch.service'
import cors from './../../security/Cors'
export default async function handler(req, res) {
  await cors(req, res)
  const service = new MeiliSearchService()
  const query = req.query.s || ''
  const document = req.query.document || ''
  if (query === '' && document === '')
    return res.status(201).json({
      success: false,
      message: 'Empty query'
    })
  let isSearch = true
  if (document !== '')
    isSearch = false
  
  let results = []
  if (isSearch) {
    results = await service.search(query)
    results = results.hits
    console.log(results)
    results = results.filter(item => item.name.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) !== -1)
  }
  else
    results = await service.find(document)
  return res.status(200).json({
    success: true,
    results
  })
}