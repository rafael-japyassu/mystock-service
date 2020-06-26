import { Router } from 'express'
import { getUsers, saveUser } from '../controllers/UserController'
const usersRoutes = Router()

usersRoutes.get('/', getUsers)
usersRoutes.post('/', saveUser)

export default usersRoutes
