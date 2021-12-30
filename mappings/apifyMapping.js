const mapping = {
    employeesDansLinkedin: "nb_employees",
    secteur: "industries" ,
    tailleEntreprise: "total_employee_count",
    telephone: "phone",
    tagLine: "motto",
    followerCount: "linkedin_follower_count",
    siegeSocial: "website",
    description: "description",
    siegeSocial: "location_city_name",
    fondeeEn: "founded_date",
    companyNameLinkedin: "name",
    banner: "banner",
    logo: "logo",
    companyUrl: "linkedIn_url",
    companyNameLinkedin: "name"
}
export default (element) => {
    const newElement = {}
    Object.keys(element).forEach(key => {
        const mapp = mapping[key] || null
        if (mapp) {
            let value = element[key]
            value = typeof value === 'object' ? JSON.stringify(value) : value
            if (mapp === 'industries' && value && value !== '')
                value = JSON.stringify([value])
            if (value && value !== '')
                newElement[mapp] = value
        } else {
            if (key === "website") {
                newElement['website'] = element[key]
            }
            if (key === "website_1" && !newElement.website) {
                newElement['website'] = element[key]
            }
        }
    })
    
    return newElement
}