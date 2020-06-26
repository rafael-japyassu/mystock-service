import { Router } from 'express'
import { login } from '../controllers/SessionController'

const sessionRoutes = Router()

sessionRoutes.post('/', login)

export default sessionRoutes
