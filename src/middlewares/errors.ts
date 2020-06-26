import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

function errors (err: Error, request: Request, response: Response, _: NextFunction): Response {
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

export default errors
