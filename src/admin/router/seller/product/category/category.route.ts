

import { Router } from 'express';
import { createCategoryHandler, deleteCategoryHandler, getByIdCategoryHandler, getPagingCategoryHandler, updateCategoryHandler, getPagingSubCategoryHandler } from '../../../../handler/seller/product/category/category.handler';
import { auth } from '../../../../middleware/auth';


const router = Router();


router.get('/', auth, getPagingCategoryHandler)
router.get('/:_id', auth, getByIdCategoryHandler)
router.get('/subCategory/:_id', auth, getPagingSubCategoryHandler)
router.post('', auth,  createCategoryHandler)
router.put('/:_id', auth, updateCategoryHandler)
router.delete('/:_id', auth, deleteCategoryHandler)

export default router;