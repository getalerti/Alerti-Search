import ApifyService from '../../services/Apify.service'
import MeiliSearchService from '../../services/MeiliSearch.service'
import cors from '../../security/Cors'

export default async function handler(req, res) {
  await cors(req, res)
  const service = new ApifyService()
  const searchService = new MeiliSearchService()
  const query = req.query.s || ''
  const id = req.query.id || ''
  if (query === '' || id === '' )
    return res.status(201).json({
            success: false,
            message: 'Empty query'
          })
  try {
    let results = await (await service.tweets(query)).json()
    if (!results) {
      return res.status(201).json({
              success: false,
              message: results.tasks ? (results.tasks[0].status_message || 'Unknown error') : 'Unknown error'
            })
    }
    const tweets = results || null
    const body = [{
      id,
      tweets,
      tweetsUpdatedAt: Date.now()
    }]
    await (await searchService.request('PUT', `/documents`, body)).json()
    return res.status(200).json({
              success: true,
              tweets
            })
  } catch (error) {
    console.log({ loadTweetsError: error })
    return res.status(401).json({
              success: false,
              message: 'Technical error'
            })
  }
}