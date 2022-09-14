

import { Router } from 'express';
import { getPagingSellerHandler, getByIdSellerHandler, createSellerHandler, updateSellerHandler, deleteSellerHandler, sellerCountHandler, SellerProductCountHandler } from '../../handler/seller/seller.handler';
import { auth } from '../../middleware/auth';


const router = Router();


router.get('/', auth, getPagingSellerHandler)
router.get('/count', auth, sellerCountHandler)
router.get('/product/count', auth, SellerProductCountHandler)
router.get('/:_id', auth, getByIdSellerHandler)
router.post('/', auth,  createSellerHandler)
router.put('/:_id', auth, updateSellerHandler)
router.delete('/:_id', auth, deleteSellerHandler)

export default router;