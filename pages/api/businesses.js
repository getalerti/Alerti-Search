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
    const body = {
      q: query
    }
    results = await (await (service.request('POST', `/search`, body))).json()
    results = results.hits || []
    results = results.filter(item => item.name.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) !== -1)
  }
  else {
    const body = {
      q: document,
    }

    results = await (await service.request('POST', `/search`, body)).json()
    results = results.hits.filter(item => item.slug == document)[0] || []
  }
  return res.status(200).json({
    success: true,
    results
  })
}