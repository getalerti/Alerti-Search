import SupabaseService from '../services/Supabase.service'
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
const jwtExtractor = (req) => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "").trim()
  }
  return token
}
const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  if(!base64Url)
    return null
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  const jwt = JSON.parse(jsonPayload);
  if (jwt.aud && jwt.email)
    return jwt
  return null;
};
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
const adminMiddleware = (middleware) => {
  return (req, res) =>
    new Promise(async (resolve, reject) => {
      // check origins
      if(!isOriginAuthorized(req.headers.host))
        return reject(result)
      
      // check auth token
      const token = jwtExtractor(req)
      if (!token)  
        return res.status(401).json({
          success: false,
          message: 'unauthorized'
        })
      if (token) {
        const jwt = parseJwt(token)
        if (!jwt)    
          return res.status(401).json({
              success: false,
              message: 'unauthorized'
          })
      req.user = jwt.email
      }
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
  }
export {
    initMiddleware,
    adminMiddleware
}