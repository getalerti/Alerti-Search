import Cors from 'cors'
import { initMiddleware } from './Middlewares'

export default initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
    optionsSuccessStatus: 200
  })
)