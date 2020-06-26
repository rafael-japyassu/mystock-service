import { IProductRequest } from '../interfaces/product'
import { getRepository } from 'typeorm'
import Product from '../models/Product'

class CreateProductService {
  public async execute ({ name, description, category_id, price, stock }: IProductRequest): Promise<Product> {
    const productRepository = getRepository(Product)

    const product = productRepository.create({
      name,
      description,
      category_id,
      price,
      stock
    })

    await productRepository.save(product)

    return product
  }
}

export default CreateProductService
