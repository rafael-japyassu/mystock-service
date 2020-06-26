import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'
import { verify, Secret } from 'jsonwebtoken'

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function authentication (request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
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
    throw new AppError('Invalid JWT token', 401)
  }
}

export default authentication
