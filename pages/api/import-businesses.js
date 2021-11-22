import DiffbotService from './../../services/Diffbot.service'
import MeiliSearchService from './../../services/MeiliSearch.service'
import SupabaseService from './../../services/Supabase.service'
import cors from './../../security/Cors'
import { makeid, stringToSlug } from '../../helpers/functions';
import env from '../../env';
import diffbotMapping from '../../mappings/diffbotMapping';
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
        const service = new SupabaseService()
        const { error } = await service.supabase.from(env.supaBaseTable)
        .insert([
            company
        ])
        if(!error) {
            done.push(company)
        } else {
            undone.push({...company, error})
        }
    }
    return {
        done,
        undone
    }
}
export default async function handler(req, res) {
    await cors(req, res)
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
        }
    } catch(error) {
        console.log(error)
        return res.status(409).json({
            success: false,
            error
        })
    }
}