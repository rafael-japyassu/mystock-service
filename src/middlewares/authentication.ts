import { Request, Response, NextFunction } from 'express'
// import AppError from '../errors/AppError'
import { verify, Secret } from 'jsonwebtoken'

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function authentication (request: Request, response: Response, next: NextFunction): Response<any> | void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      status: 'error',
      message: 'JWT token is missing!'
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, process.env.APP_SECRET as Secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    return response.status(401).json({
      status: 'error',
      message: 'JWT token is invalid!'
    })
  }
}

export default authentication
