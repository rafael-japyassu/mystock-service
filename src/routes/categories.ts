import { Router } from 'express'
import { getCategories, saveCategory, getCategory, updateCategory, deleteCategory } from '../controllers/CategoryController'
const categoriesRoutes = Router()

categoriesRoutes.get('/', getCategories)
categoriesRoutes.get('/:id', getCategory)
categoriesRoutes.post('/', saveCategory)
categoriesRoutes.put('/:id', updateCategory)
categoriesRoutes.delete('/:id', deleteCategory)

export default categoriesRoutes
