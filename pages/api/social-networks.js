import DiffbotService from '../../services/Diffbot.service'
import cors from '../../security/Cors'
import MeiliSearchService from '../../services/MeiliSearch.service'

export default async function handler(req, res) {
  await cors(req, res)
  const service = new DiffbotService()

  const url = req.query.url || ''
  const id = req.query.id || ''
  if (url === '' || id === '') {
    return res.status(201).json({
      success: false,
      message: 'Empty URL or ID'
    })
   }
   let results = await (await (service.request(url, 'organization'))).json()
   
   if (!results || !results.objects || !results.objects.length)
      results = null
   else {
      const { facebookUri, twitterUri, linkedInUri, githubUri, allUris } = results.objects[0]
      const searchInstagramUri = allUris.filter(uri => uri.indexOf('instagram.com') !== -1)
      const instagramUri = searchInstagramUri.length ? searchInstagramUri[0] : null
      results = {
            facebookUri,
            twitterUri,
            linkedInUri,
            githubUri,
            instagramUri
        }

        const searchService = new MeiliSearchService()
        const body = [{
            id,
            socials: results
          }]
          await (await searchService.request('PUT', `/documents`, body)).json()
    }
   return res.status(200).json({
      success: true,
      results
   })
}