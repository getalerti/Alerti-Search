import { createClient } from '@supabase/supabase-js'
import env from './../env'

class SupabaseService {
    constructor() {
        if (!env.supaBaseUrl || !env.supaBasePublicKey) {
            throw 'Empty supabase params'
        }
        this.supabase = createClient(env.supaBaseUrl, env.supaBasePublicKey)
    }
    search = function (query, limit) {
        console.log(`name`, `%${query}%`, limit)
        return this.supabase
            .from(env.supaBaseTable)
            .select()
            .ilike(`name`, `%${query}%`)
            .range(limit - 20, limit)
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
        return this.supabase
            .from(env.supaBaseTable)
            .update(body)
            .match({ id })
    }
    insert = function (body) {
        delete body.id
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
