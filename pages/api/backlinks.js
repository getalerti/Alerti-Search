import DataforseoService from '../../services/Dataforseo.service'
import MeiliSearchService from '../../services/MeiliSearch.service'
import DiffbotService from '../../services/Diffbot.service'
import cors from '../../security/Cors'

export default async function handler(req, res) {
  await cors(req, res)
  const service = new DataforseoService()
  const searchService = new MeiliSearchService()
  const query = req.query.s || ''
  const id = req.query.id || ''
  const only = req.query.only || ''
  if (only === 'sentiment' && id !== '') {
    try {
      const { articles } = await (await searchService.request('GET', `/documents/${id}`)).json()
      const diffbotService = new DiffbotService()
      for (let index = 0; index < articles.length; index++) {
        const { title, url } = articles[index];
        let content = await (await (diffbotService.request(url))).json()
        if (!content || !content.objects || !content.objects.length)
          content = null
        else
          content = content.objects[0]
        if (!content.title) {
          content.title = title
        }
        articles[index]['content'] = content
      }
      const body = [{
        id,
        articles,
      }]
      await (await searchService.request('PUT', `/documents`, body)).json()
    } catch (error) {
      console.log({sentimentsError: JSON.stringify(error)})
    }
    return res.status(201).json({
      success: true,
    })
  }
  const lang = req.query.lang || Intl.DateTimeFormat().resolvedOptions().locale
  const location = req.query.location || 2250
  if (query === '' || lang === '' || id === '' )
    return res.status(201).json({
            success: false,
            message: 'Empty query'
          })
  let results = await (await service.request(query, lang, location)).json()

  console.log({tasks: results.tasks})
  if (!results || !results.tasks || !results.tasks[0].result[0].items) {
    return res.status(201).json({
            success: false,
            message: results.tasks ? (results.tasks[0].status_message || 'Unknown error') : 'Unknown error'
          })
  }
  const articles = results.tasks[0].result[0].items || []
  const body = [{
    id,
    articles,
    articlesUpdatedAt: Date.now()
  }]
  await (await searchService.request('PUT', `/documents`, body)).json()
  return res.status(200).json({
            success: true,
            articles
          })
}