import { createClient } from '@supabase/supabase-js'
import env from './../env'

class SupabaseService {
    constructor() {
        if (!env.superBaseUrl || !env.superBasePublicKey) {
            throw 'Empty supabase params'
        }
        this.supabase = createClient(env.superBaseUrl, env.superBasePublicKey)
    }
    search = function (query, selectedFields, field, table = null) {
        return this.supabase
            .from(table || env.subabaseDefaultTable)
            .select(selectedFields)
            .like(field, `%${query}%`)
    }
}

export default SupabaseService
