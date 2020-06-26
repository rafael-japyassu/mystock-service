import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Category from '../models/Category'
import AppError from '../errors/AppError'

export const getCategories = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const categoryRepository = getRepository(Category)
    const categories = await categoryRepository.find()
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

export const saveCategory = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { name } = request.body

    const categoryRepository = getRepository(Category)
    const category = categoryRepository.create({
      name
    })

    await categoryRepository.save(category)

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
