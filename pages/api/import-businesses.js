import DiffbotService from './../../services/Diffbot.service'
import MeiliSearchService from './../../services/MeiliSearch.service'
import cors from './../../security/Cors'
import diffbotCompanyMapping from '../../helpers/diffbotCompanyMapping';
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
    result.data.forEach(async (item) => {
        const company = diffbotCompanyMapping(item)
        const meiliService = new MeiliSearchService()
        await (await meiliService.request('POST', '/documents', [company])).json()
        console.log(`company ${company.name} added!`)
    });
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