import { createClient } from '@supabase/supabase-js'
import env from './../env'

class SupabaseService {
    constructor() {
        if (!env.superBaseUrl || !env.superBasePublicKey) {
            throw 'Empty supabase params'
        }
        this.supabase = createClient(env.superBaseUrl, env.superBasePublicKey)
    }
    search = function (query, selectedFields, fields, table = null) {
        const fildsArray = fields.split(',')
        let fieldQuery = ''
        fildsArray.forEach((field, index) => {
            const _query = `${field}.ilike.%${query}%`
            fieldQuery += `${index > 0 ? ',' : ''}${_query}`
        })
        console.log({fieldQuery})
        return this.supabase
            .from(table || env.subabaseDefaultTable)
            .select(selectedFields)
            .or(fieldQuery)
    }
    find = function (id, table = null) {
        return this.supabase
            .from(table || env.subabaseDefaultTable)
            .select()
            .eq("id", id)
    }
}

export default SupabaseService
