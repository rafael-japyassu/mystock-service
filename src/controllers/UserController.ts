import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'

import CreateUserService from '../services/CreateUserService'

export const getUsers = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const userRepository = getRepository(User)
    const users = await userRepository.find()
    return response.json(users)
  } catch (err) {
    console.log(err)
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
