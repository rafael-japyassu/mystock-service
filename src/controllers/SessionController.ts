import { Request, Response } from 'express'
import AppError from '../errors/AppError'

import AuthenticateUserService from '../services/AuthenticateUserService'

export const login = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { email, password } = request.body
    const authenticateUser = new AuthenticateUserService()

    const auth = await authenticateUser.execute({
      email,
      password
    })

    delete auth.user.password

    return response.json(auth)
  } catch (err) {
    if (err instanceof AppError) {
      return response.status(err.statuesCode).json({
        status: 'error',
        message: err.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}
