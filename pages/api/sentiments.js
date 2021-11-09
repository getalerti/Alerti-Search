import DiffbotService from './../../services/Diffbot.service'
import cors from './../../security/Cors'
export default async function handler(req, res) {
  await cors(req, res)
  const service = new DiffbotService()
  const url = req.query.url || ''
  if (url === '') {
    return res.status(201).json({
      success: false,
      message: 'Empty URL'
    })
   }
   let results = await (await (service.request(url))).json()
   if (!results || !results.objects || !results.objects.length)
      results = null
   else
      results = {
         tags: results.objects[0].tags,
         sentiment: results.objects[0].sentiment,
      }
   return res.status(200).json({
      success: true,
      results
   })
}