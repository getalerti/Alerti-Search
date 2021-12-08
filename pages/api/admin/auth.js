import Cors from "../../../security/Cors"
import SupabaseService from "../../../services/Supabase.service"
const service = new SupabaseService()

const signin = async (email, password) => {
  return await service.supabase.auth.signIn({
    email, password,
  })
}
export default async function handler(req, res) {
  await Cors(req, res)
  try {
    const { email, password } = JSON.parse(req.body)
    if (!email || email == '' || !password || password == '')
        throw 'invalid credentials'
    const { session, error } = await signin(email, password)
    if (error)
        throw error.message
    return res.status(200).json({
        success: true,
        results: session
    }) 
    
  } catch (error) {
    return res.status(401).json({
        success: false,
        message: error
      }) 
  }
}