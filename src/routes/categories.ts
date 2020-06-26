import { Router } from 'express'
import { getCategories, saveCategory } from '../controllers/CategoryController'
const categoriesRoutes = Router()

categoriesRoutes.get('/', getCategories)
categoriesRoutes.post('/', saveCategory)

export default categoriesRoutes
