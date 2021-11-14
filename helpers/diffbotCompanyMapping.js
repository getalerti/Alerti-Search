import { stringToSlug } from "./functions"

export default (values) => {
    if (!values) {
        throw 'no valus for mapping'
    }
    const mapping = {
        id: 'id',
        homepageUri: 'website',
        ceo : 'ceo',
        type: 'industry',
        logo: 'logo',
        summary: 'tagLine',
        description: 'description',
        image: 'banner',
        industries: 'specialties',
        name: 'name',
        nbEmployees: 'companySize'
    }
    const results = {}
    Object.keys(values).map(key => {
        if (key === 'location') {
            results['companyAddress'] = values[key].address || ''
        } else if (key === 'facebookUri' || key === 'twitterUri' || key === 'githubUri' || key === 'linkedInUri') {
            if (!results.socials) {
                const { facebookUri, twitterUri, linkedInUri, githubUri, allUris } = values
                const searchInstagramUri = allUris.filter(uri => uri.indexOf('instagram.com') !== -1)
                const instagramUri = searchInstagramUri.length ? searchInstagramUri[0] : null
                const searchYoutubeUri = allUris.filter(uri => uri.indexOf('youtube.com') !== -1)
                const youtubeUri = searchYoutubeUri.length ? searchYoutubeUri[0] : null
                results['socials'] = {facebookUri, twitterUri, linkedInUri, githubUri, instagramUri, youtubeUri}
            }
        } else if (key === 'foundingDate') {
            results['founded'] = values[key] ? new Date(values[key].timestamp).toLocaleDateString() : ''
        }  else if (key === 'revenue') {
            results['averageTenure'] = values[key] ? `${values[key].currency} ${values[key].value}` : ''
        } 
        else {
            const resKey = mapping[key]
            if (resKey) {
                results[resKey] = values[key]
            }
        }
    })
    results['slug'] = stringToSlug(results.name)
    return results
}