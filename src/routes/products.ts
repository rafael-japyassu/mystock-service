import { Router } from 'express'
import { getProducts, saveProduct, getProductsFilter, updateProduct, deleteProduct } from '../controllers/ProductController'

const productsRoutes = Router()

productsRoutes.get('/', getProducts)
productsRoutes.get('/filter', getProductsFilter)
productsRoutes.post('/', saveProduct)
productsRoutes.put('/:id', updateProduct)
productsRoutes.delete('/:id', deleteProduct)

export default productsRoutes
