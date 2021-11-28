import { createClient } from '@supabase/supabase-js'
import env from './../env'

class SupabaseService {
    constructor() {
        if (!env.supaBaseUrl || !env.supaBasePublicKey) {
            throw 'Empty supabase params'
        }
        this.supabase = createClient(env.supaBaseUrl, env.supaBasePublicKey)
    }
    search = function (query, limit, filters = null) {
        let queryBuilder = this.supabase
                .from(env.supaBaseTable)
                .select()
        if (query) 
           queryBuilder = queryBuilder
            .ilike(`name`, `%${query}%`)
        if (filters && filters.from && filters.to)  
            queryBuilder = queryBuilder
                .lt('timestamp', parseInt(filters.to))
                .gte('timestamp', parseInt(filters.from))
        if (filters && filters.verified !== undefined)  
            queryBuilder = queryBuilder
                .eq('is_verified', (filters.verified == true || filters.verified == 'true') ? true : false)
        return queryBuilder
            .range(limit - 20, limit)
            .order('timestamp', { ascending: false })
    }
    unSyncronizedItems = async (maxID) => {
        return this.supabase
                .from(env.supaBaseTable)
                .select()
                .gte('id', maxID)
                .match({ is_verified: true })
                .range(1, 1000)
    }
    find = function (id, table) {
        return this.supabase
            .from(table)
            .select()
            .eq("id", id)
    }
    update = function (id, body) {
        delete body.id
        delete body.id_alerti
        body.timestamp = Date.now()
        return this.supabase
            .from(env.supaBaseTable)
            .update(body)
            .match({ id })
    }
    insert = function (body) {
        delete body.id
        body.timestamp = Date.now()
        return this.supabase
            .from(env.supaBaseTable)
            .insert([body])
    }
    remove = function (id) {
        return this.supabase
            .from(env.supaBaseTable)
            .delete()
            .match({ id })
    }
    log = function (user, operation, inputs = null, request = null) {
        return this.supabase
            .from(env.supaBaseLogs)
            .insert([{ user, operation, inputs, request }])
    }
    searchLogs = function (query, operation, exist = false, range = 20) {
        let queryBuilder = this.supabase.from(env.supaBaseLogs)
        
        if (exist && query !== '')
            queryBuilder = queryBuilder.select('id')
            .eq(`inputs`, query)
            .eq(`operation`, operation)
            .range(1, 1)
        
        if (query !== '' && !exist)
            queryBuilder = queryBuilder.select()
            .eq(`inputs`, query)
            .eq(`operation`, operation)
            .range(range - 19, range)
        
        if (query === '' && !exist)
            queryBuilder = queryBuilder.select()
            .eq(`operation`, operation)
            .range(range - 19, range)
        
        return queryBuilder

    }
}

export default SupabaseService
