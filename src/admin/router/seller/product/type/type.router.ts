

import { Router } from 'express';
import { createTypeHandler, deleteProductTypeHandler, getByIdProductTypeFieldHandler, getByIdProductTypeHandler, getByIdProductTypeValueHandler, getPagingProductTypeHandler, updateProductTypeHandler } from '../../../../handler/seller/product/type/type.handler';

import { auth } from '../../../../middleware/auth';


const router = Router();


router.get('/field/:_id', auth, getByIdProductTypeFieldHandler)
router.get('/:_id', auth, getByIdProductTypeHandler)
router.get('/value/:_id', auth, getByIdProductTypeValueHandler)
router.get('/category/:_id', auth, getPagingProductTypeHandler)
router.post('/', auth, createTypeHandler)
router.put('/:_id', auth, updateProductTypeHandler)
router.delete('/:_id', auth, deleteProductTypeHandler)

export default router;