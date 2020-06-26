import { IProductRequest } from '../interfaces/product'
import { getRepository } from 'typeorm'
import Product from '../models/Product'
import AppError from '../errors/AppError'

class UpdateProductService {
  public async execute ({ id, name, description, category_id, price, stock }: IProductRequest): Promise<Product | undefined> {
    try {
      const productRepository = getRepository(Product)

      await productRepository.update({ id }, {
        name,
        description,
        category_id,
        price,
        stock
      })

      const productUpdated = await productRepository.findOne(id)

      return productUpdated
    } catch {
      throw new AppError('Product not found')
    }
  }
}

export default UpdateProductService
