import DiffbotService from '../../../services/Diffbot.service'
import MeiliSearchService from '../../../services/MeiliSearch.service'
import SupabaseService from '../../../services/Supabase.service'
import AdminCors from '../../../security/AdminCors'
import { makeid, stringToSlug } from '../../../helpers/functions';
import diffbotMapping from '../../../mappings/diffbotMapping';

const supabaseService = new SupabaseService()

const defaultImport = async (req) => {
    const company = JSON.parse(req.body) || null;
    if (!company) {
        throw 'Empty params'
    }
    const meiliService = new MeiliSearchService()
    return await (await meiliService.request('POST', '/documents', [company])).json()
}
const diffbotImport = async (req) => {
    const { type, industry, city, from, to } = req.query
    const service = new DiffbotService()
    if (!type || !industry || !city || !from || !to) {
        throw 'Empty params'
    }
    const result = await (await service.customQuery(type, industry, city, from, to)).json()
    if (!result.data || !result.data.length)
        throw 'no diffbot results found'
    await supabaseService.log(req.user, 'DIFFBOT_REQUEST', JSON.stringify({type, industry, city, from, to}))
    let items = result.data
    items = items.filter(item => {
        return item.homepageUri && item.homepageUri !== '' && item.name && item.name !== ''
    })
    const done = []
    const undone = []
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const company = diffbotMapping(element)
        company['id_alerti'] = makeid('cmp')
        company['slug'] = stringToSlug(element.name)
        company['source'] = 'diffbot'
        const { error } = await supabaseService
        .insert(company)
        if(!error) {
            done.push(company)
        } else {
            await supabaseService.log(req.user, 'ERROR_INSERT_COMPANY', JSON.stringify({company, error}))
            undone.push({...company, error})
        }
    }
    return {
        done,
        undone
    }
}
export default async function handler(req, res) {
    await AdminCors(req, res)
    try {
        const action = req.query.action || 'default'
        if (action === 'default') {
            const results = await defaultImport(req)
            return res.status(200).json({
                success: true,
                results
            })
        }
        if (action === 'diffbot') {
            const results = await diffbotImport(req)
            return res.status(200).json({
                success: true,
                results
            })
        } else {
            throw 'Technical error'
        }
    } catch(error) {
        console.log({ImportError: error})
        await supabaseService.log(req.user, 'ERROR_IMPORT', JSON.stringify({ImportError: error}), null)
        return res.status(409).json({
            success: false,
            error
        })
    }
}