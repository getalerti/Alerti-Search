
/*import { useEffect } from 'react'
import SupabaseService from '../services/Supabase.service'
import db from './../helpers/db.json'
export default () => {
    const cols = 'id_alerti;angellist_url;linkedin_average_tenure;banner;blog_url;ceo_name;company_size;crunchbase_url;description;descriptors;domain;dribble_url;dribble_url;error;facebook_fan_count;facebook_url;founded_date;github_stars;github_url;growth_1yr;growth_2yr;growth_6mth;headquarter;industries;industry_code;insagram_url;instagram_followers_count;is_acquired;is_claimable;is_claimed;is_dissolved;is_non_profit;is_public;is_verified;linkedin_follower_count;linkedIn_url;location_address;location_city_name;location_country_name;location_postal_code;location_region_name;logo;logs;medium_blog_subscribers;motto;name;nb_employees;parent_company_name;phone;pinterest_subscribers_count;pinterest_url;sales_navigator_link;saved_img;specialisations;summary;timestamp;total_employee_count;twitter_followers_count;twitter_url;type;verification_date;website;wikipedia_en_url;youtube_channel_videos_count;youtube_channel_url;youtube_sunscribers_count;articles'
    const service = new SupabaseService()
    
    const insertDB = async (data) => {
        const result = await service.supabase.from('companies')
        .insert([
            data
        ])
        console.log({result})
    }
    useEffect(() => {
        db.forEach(item => {
            const data = {}
            cols.split(";").forEach(col => {
                let value = item[col]

                if (col.indexOf('is_') !== -1) {
                    value = value ? "true" : "false"
                }
                if (typeof value === 'object')
                    value = JSON.stringify(value)
                if (value === undefined || value === null)
                    value = ""
                data[col] = value;
            })
            insertDB(data);
        })
    }, [])
    return <></>;
}/*