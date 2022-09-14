

import { Router } from 'express';
import { createPricePlusHandler, deletePricePlusHandler, getByIdPricePlusHandler, getByIdPricePlusPlaceholderHandler, getPagingPricePlusHandler, updatePricePlusHandler } from '../../../../../handler/seller/product/price/price plus admin/prise.hadler';
import { auth } from '../../../../../middleware/auth';


const router = Router();


router.get('/category/:_id', auth, getPagingPricePlusHandler)
router.get('/:_id', auth, getByIdPricePlusHandler)
router.get('/placeholder/:_id', auth, getByIdPricePlusPlaceholderHandler)
router.post('/', auth,  createPricePlusHandler)
router.put('/:_id', auth, updatePricePlusHandler)
router.delete('/:_id', auth, deletePricePlusHandler)

export default router;