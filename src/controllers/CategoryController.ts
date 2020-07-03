import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Category from '../models/Category'
import AppError from '../errors/AppError'

import CreateLoggerService from '../services/CreateLoggerService'
import { LoggerDescription } from '../enums/enums'

export const getCategories = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { id } = request.user
    const categoryRepository = getRepository(Category)
    const loggerService = new CreateLoggerService()

    const categories = await categoryRepository.find()

    await loggerService.execute({
      user_id: id,
      description: LoggerDescription.SELECT_ALL,
      table: 'categories'
    })

    return response.json(categories)
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

export const getCategory = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { id } = request.params
    const categoryRepository = getRepository(Category)
    const category = await categoryRepository.findOne(id)

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.SELECT_ONE,
      table: 'categories'
    })

    return response.json(category)
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

export const saveCategory = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { name } = request.body
    const { id } = request.user
    const loggerService = new CreateLoggerService()

    const categoryRepository = getRepository(Category)
    const category = categoryRepository.create({
      name
    })

    await categoryRepository.save(category)

    await loggerService.execute({
      user_id: id,
      description: LoggerDescription.INSERT,
      table: 'categories'
    })

    return response.json(category)
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

export const updateCategory = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { id } = request.params
    const { name } = request.body

    const categoryRepository = getRepository(Category)
    const category = categoryRepository.create({
      name
    })

    await categoryRepository.update(id, category)

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.UPDATE,
      table: 'categories'
    })

    return response.json(category)
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

export const deleteCategory = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { id } = request.params
    const categoryRepository = getRepository(Category)
    await categoryRepository.delete(id)

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.DELETE,
      table: 'categories'
    })

    return response.status(204).send()
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
