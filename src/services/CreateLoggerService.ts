import { ILoggerRequest } from '../interfaces/logger'
import { getRepository } from 'typeorm'
import Logger from '../models/Logger'

class CreateLoggerService {
  public async execute ({ user_id, table, description }: ILoggerRequest): Promise<void> {
    const loggerRepository = getRepository(Logger)

    const logger = loggerRepository.create({
      user_id,
      description,
      table
    })

    await loggerRepository.save(logger)
  }
}

export default CreateLoggerService
