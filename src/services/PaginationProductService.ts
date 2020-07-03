import { IProductFilterPaginationRequest } from '../interfaces/product'
import { getRepository, Like } from 'typeorm'
import Product from '../models/Product'

class PaginationProductService {
  public async execute ({ name, description = '', category_id = '', page = 1, size = 10 }: IProductFilterPaginationRequest): Promise<Product[]> {
    const productRepository = getRepository(Product)

    if (category_id === '' || category_id === undefined) {
      const products = await productRepository.find({
        where: {
          name: Like(`%${name}%`),
          description: Like(`%${description}%`)
        },
        take: size,
        skip: page,
        relations: ['category'],
        order: {
          name: 'ASC'
        }
      })
      return products
    }

    const products = await productRepository.find({
      where: {
        name: Like(`%${name}%`),
        category_id,
        description: Like(`%${description}%`)
      },
      take: size,
      skip: page,
      relations: ['category']
    })

    return products
  }
}

export default PaginationProductService
