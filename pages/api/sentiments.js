import DiffbotService from './../../services/Diffbot.service'
import cors from './../../security/Cors'
import CacheService from './../../services/Cache.service'
const cache = new CacheService()

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

   //new Buffer(url).toString('base64')
   //new Buffer("sss", 'base64').toString('ascii')
   
   try {
      let cachedResult = cache.get(new Buffer(url).toString('base64'))
      cachedResult = cachedResult ? JSON.parse(cachedResult) : null
      if (cachedResult) {
         return res.status(200).json({
            success: true,
            results: cachedResult
         })
      }
   } catch(err) {
      console.log({cachedResulterr: err})
   }
   let results = await (await (service.request(url))).json()
   
   if (!results || !results.objects || !results.objects.length)
      results = null
   else
      results = results.objects[0]
   
      cache.save(new Buffer(url).toString('base64'), JSON.stringify(results))
   return res.status(200).json({
      success: true,
      results
   })
}