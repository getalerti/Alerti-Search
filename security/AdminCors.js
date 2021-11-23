import Cors from 'cors'
import { adminMiddleware } from './Middlewares'

export default adminMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
    optionsSuccessStatus: 200
  })
)