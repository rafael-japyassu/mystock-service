import { IProductFilterPaginationRequest } from '../interfaces/product'
import { getRepository, Like } from 'typeorm'
import Product from '../models/Product'

interface PaginationProducts {
  products: Product[];
  page: number;
  itemsPage: number;
  total: number;
  totaPages: number;
}

class PaginationProductService {
  public async execute ({ name, description = '', category_id = '', page = 1, size = 10 }: IProductFilterPaginationRequest): Promise<PaginationProducts> {
    const productRepository = getRepository(Product)

    if (category_id === '' || category_id === undefined) {
      const [products, total] = await productRepository.findAndCount({
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
      const pageNumber = Math.ceil(total / products.length)
      const pagination = {
        products,
        page: (page + 1),
        itemsPage: products.length,
        total,
        totaPages: pageNumber
      }
      return pagination
    }

    const [products, total] = await productRepository.findAndCount({
      where: {
        name: Like(`%${name}%`),
        category_id,
        description: Like(`%${description}%`)
      },
      take: size,
      skip: page,
      relations: ['category']
    })

    const pageNumber = Math.ceil(total / products.length)
    const pagination = {
      products,
      page: (page + 1),
      itemsPage: products.length,
      total,
      totaPages: pageNumber
    }
    return pagination
  }
}

export default PaginationProductService
