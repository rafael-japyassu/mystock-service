import { IUserRequest } from '../interfaces/user'
import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/User'
import AppError from '../errors/AppError'

class CreateUserService {
  public async execute ({ name, email, password }: IUserRequest): Promise<User> {
    const userRepository = getRepository(User)

    const checkUserExists = await userRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new AppError('Email address already used')
    }

    const hashPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashPassword
    })

    await userRepository.save(user)

    return user
  }
}

export default CreateUserService
