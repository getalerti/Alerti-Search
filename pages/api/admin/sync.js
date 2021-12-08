import AdminCors from "../../../security/AdminCors"
import SupabaseService from "../../../services/Supabase.service"
import MeilisearchService from "../../../services/MeiliSearch.service"
const service = new SupabaseService()
const meilisearchService = new MeilisearchService()

const sync = async () => {
  const unSyncResult = await service.unSyncronizedItems()
  if (!unSyncResult.error) {
    const items = unSyncResult.data
    const companiesNames = []
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      await (await meilisearchService.request('POST', '/documents', [item])).json()
      await service.update(item.id, {syncronized: true})
      companiesNames.push(item.name)
    }
    return companiesNames
  } else {
    throw unSyncResult.error
  }
}

export default async function handler(req, res) {
  await AdminCors(req, res)
  let results = []
  try {
    switch (req.method) {
      case 'GET':
        const syncResult = await sync()
        results = syncResult
        await service.log(req.user, 'SYNC_SUCCESS', JSON.stringify(results), null)
        break;
      default:
        throw 'Technical error'
    }
  } catch (error) {
    await service.log(req.user, 'ERROR_SYNC', JSON.stringify(error), null)
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