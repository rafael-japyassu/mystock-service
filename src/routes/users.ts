import { Router } from 'express'
import { saveUser } from '../controllers/UserController'
const usersRoutes = Router()

usersRoutes.post('/', saveUser)

export default usersRoutes
