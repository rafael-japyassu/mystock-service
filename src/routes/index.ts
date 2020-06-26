import { Router } from 'express'
import usersRouters from './users'
import sessionsRouters from './session'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello Challenge Adopets' })
})

routes.use('/api/v1/session', sessionsRouters)
routes.use('/api/v1/users', usersRouters)

export default routes
