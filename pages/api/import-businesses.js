import GoogleSheetService from './../../services/GoogleSheet.service'
import MeiliSearchService from './../../services/MeiliSearch.service'
import cors from './../../security/Cors'
export default async function handler(req, res) {
    await cors(req, res)
    try {
        const company = JSON.parse(req.body) || null;
        if (!company)
            return res.status(201).json({
                success: false,
            })
        const meiliService = new MeiliSearchService()
        const insertResults = await (await meiliService.request('POST', '/documents', [company])).json()
        return res.status(200).json({
            success: true,
            results: insertResults
        })
    } catch(error) {
        return res.status(409).json({
            success: false,
            error
        })
    }
}