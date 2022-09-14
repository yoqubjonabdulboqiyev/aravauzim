

import { Router } from 'express';
import { createPricePlusSellerHandler, getByIdPricePlusSellerHandler, getPagingPricePlusSellerHandler } from '../../../../../handler/seller/product/price/price plus seller/price.handler';
import { auth } from '../../../../../middleware/auth';


const router = Router();


router.get('/category/:_id', auth, getPagingPricePlusSellerHandler)
router.get('/:_id', auth, getByIdPricePlusSellerHandler)
router.post('/', auth,  createPricePlusSellerHandler)
// router.put('/:_id', auth, updatePricePlusSellerHandler)
// router.delete('/:_id', auth, deletePricePlusSellerHandler)

export default router;