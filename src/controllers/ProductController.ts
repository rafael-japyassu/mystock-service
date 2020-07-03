import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { LoggerDescription } from '../enums/enums'
import Product from '../models/Product'
import AppError from '../errors/AppError'

import CreateProductService from '../services/CreateProductService'
import FindProductsService from '../services/FindProductsService'
import PaginationProductService from '../services/PaginationProductService'
import UpdateProductService from '../services/UpdateProductService'
import DeleteProductService from '../services/DeleteProductService'
import CreateLoggerService from '../services/CreateLoggerService'

export const getProducts = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const productRepository = getRepository(Product)
    const products = await productRepository.find({
      relations: ['category'],
      order: {
        name: 'ASC'
      }
    })

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.SELECT_ALL,
      table: 'products'
    })

    return response.json(products)
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

export const getProduct = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { id } = request.params

    const productRepository = getRepository(Product)
    const product = await productRepository.findOne(id, {
      relations: ['category']
    })

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.SELECT_ONE,
      table: 'products'
    })

    return response.json(product)
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

export const getProductPagination = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { name, description, category_id, page, size } = request.query

    const filterProduct = new PaginationProductService()

    const pageValue = page === undefined ? 0 : parseInt(page?.toString())
    const sizeValue = size === undefined ? 10 : parseInt(size?.toString())

    const offset = (pageValue - 1) * sizeValue

    const products = await filterProduct.execute({
      name: name?.toString(),
      category_id: category_id?.toString(),
      description: description?.toString(),
      page: offset,
      size: sizeValue
    })

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.SELECT_PAGINATION,
      table: 'products'
    })

    return response.json(products)
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

export const getProductsFilter = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { name, description, category_id } = request.query
    const filterProduct = new FindProductsService()

    const products = await filterProduct.execute({
      name: name?.toString(),
      category_id: category_id?.toString(),
      description: description?.toString()
    })

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.SELECT_FILTERS,
      table: 'products'
    })

    return response.json(products)
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

export const saveProduct = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { name, description, category_id, price, stock } = request.body
    const createProduct = new CreateProductService()

    const product = await createProduct.execute({
      name,
      description,
      category_id,
      price,
      stock
    })

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.INSERT,
      table: 'products'
    })

    return response.json(product)
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

export const updateProduct = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { id } = request.params
    const { name, description, category_id, price, stock } = request.body
    const updateProduct = new UpdateProductService()

    const product = await updateProduct.execute({
      id,
      name,
      description,
      category_id,
      price,
      stock
    })

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.UPDATE,
      table: 'products'
    })

    return response.json(product)
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

export const deleteProduct = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { id } = request.params
    const deleteProduct = new DeleteProductService()

    await deleteProduct.execute(id)

    const loggerService = new CreateLoggerService()
    await loggerService.execute({
      user_id: request.user.id,
      description: LoggerDescription.DELETE,
      table: 'products'
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
