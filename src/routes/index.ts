import { Router } from 'express'
import usersRouters from './users'
import sessionsRouters from './session'
import categoriesRouters from './categories'

import authenticate from '../middlewares/authentication'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello Challenge Adopets' })
})

routes.use('/api/v1/session', sessionsRouters)
routes.use('/api/v1/users', usersRouters)
routes.use(authenticate)
routes.use('/api/v1/categories', categoriesRouters)

export default routes
