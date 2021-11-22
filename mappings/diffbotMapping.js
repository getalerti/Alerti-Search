const mapping = {
    angellistUri: "angellist_url",
    blogUri: "blog_url",
    ceo_name: "ceo_name",
    crunchbaseUri: "crunchbase_url",
    description: "description",
    descriptors: "descriptors",
    facebookUri: "facebook_url",
    githubUri: "github_url",
    industries: "industries",
    isAcquired: "is_acquired",
    isDissolved: "is_dissolved",
    isNonProfit: "is_non_profit",
    isPublic: "is_public",
    linkedInUri: "linkedIn_url",
    location_address: "location_address",
    location_city_name: "location_city_name",
    location_country_name: "location_country_name",
    location_postalCode: "location_postal_code",
    location_region_name: "location_region_name",
    logo: "logo",
    motto: "motto",
    name: "name",
    nbEmployees: "nb_employees",
    parentCompany_name: "parent_company_name",
    summary: "summary",
    twitterUri: "twitter_url",
    homepageUri: "website",
    wikipediaUri: "wikipedia_en_url"
}
export default (element) => {
    const newElement = {}
    Object.keys(element).forEach(key => {
        const mapp = mapping[key] || null
        if (mapp) {
            let value = element[key]
            value = typeof value === 'object' ? JSON.stringify(value) : value
            newElement[mapp] = value
        }
    })
    
    return newElement
}