import { IUserRequest } from '../interfaces/user'
import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/User'
import AppError from '../errors/AppError'

class CreateUserService {
  public async execute ({ name, email, password, confirmPassword }: IUserRequest): Promise<User> {
    const userRepository = getRepository(User)

    if (password !== confirmPassword) {
      throw new AppError('Incorrect password confirmation')
    }

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
