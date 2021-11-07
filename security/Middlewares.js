import env from './../env'

const isOriginAuthorized = (origin) => {
  const authorized_origins = env.authorized_origins
  if (authorized_origins === '' || authorized_origins.split(',').length === 0)
    return false
  const origins = authorized_origins.split(',')
  if (origins.indexOf(origin) === -1)
    return false
  return true
}
const initMiddleware = (middleware) => {
    return (req, res) =>
      new Promise((resolve, reject) => {
        // check origins
        if(!isOriginAuthorized(req.headers.host))
          return reject(result)
        
        middleware(req, res, (result) => {
          if (result instanceof Error) {
            return reject(result)
          }
          return resolve(result)
        })
      })
  }
export {
    initMiddleware
}