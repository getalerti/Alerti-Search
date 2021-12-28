import env from '../env'
class CloudinaryService {
    constructor() {
        if (!env.cloudinary_api_key || !env.cloudinary_url || !env.cloudinary_name) {
            throw 'Empty cloudinary params'
        }
        this.headers = new Headers()
        this.headers.append("Content-Type", "application/x-www-form-urlencoded")
    }
    uploadImage = function(url, name) {
        return fetch(`${env.cloudinary_url}${env.cloudinary_name}/image/upload`, {
            body: `file=${encodeURIComponent(url)}&timestamp=${Date.now()}&api_key=${env.cloudinary_api_key}&upload_preset=cnha8iey&public_id=${name}`,
            headers: this.headers,
            method: "POST"
        })
    }
}

export default CloudinaryService
