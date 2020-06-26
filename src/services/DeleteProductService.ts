import { getRepository } from 'typeorm'
import Product from '../models/Product'
import AppError from '../errors/AppError'

class DeleteProductService {
  public async execute (id: string): Promise<void> {
    try {
      const productRepository = getRepository(Product)

      const product = await productRepository.findOne(id)

      if (product === undefined) {
        throw new AppError('Product not found')
      }

      await productRepository.delete({ id })
    } catch {
      throw new AppError('Product not found')
    }
  }
}

export default DeleteProductService
