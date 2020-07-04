import { Request, Response } from 'express'
import AppError from '../errors/AppError'

import CreateUserService from '../services/CreateUserService'

export const saveUser = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { name, email, password, confirmPassword } = request.body
    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
      confirmPassword
    })

    delete user.password

    return response.json(user)
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
