

import { Router } from 'express';
import { getPagingCategoryProductHandler, getByIdProductHandler, createProductHandler, updateProductHandler, deleteProductHandler } from '../../../handler/seller/product/product.handler';
import { auth } from '../../../middleware/auth';


const router = Router();


router.get('/category/:_id', auth, getPagingCategoryProductHandler)
router.get('/:_id', auth, getByIdProductHandler)
router.post('/', auth,  createProductHandler)
router.put('/:_id', auth, updateProductHandler)
router.delete('/:_id', auth, deleteProductHandler)

export default router;  