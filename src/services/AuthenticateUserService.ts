import { getRepository } from 'typeorm'
import User from '../models/User'
import { ISessionRequest, ISessionResponse } from '../interfaces/session'
import { compare } from 'bcryptjs'
import AppError from '../errors/AppError'
import { sign, Secret } from 'jsonwebtoken'

class AuthenticateUserService {
  public async execute ({ email, password }: ISessionRequest): Promise<ISessionResponse> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, process.env.APP_SECRET as Secret, {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService
