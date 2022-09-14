

import { Router } from 'express';
import { getPagingMeasureHandler, getByIdMeasureHandler, createMeasureHandler, updateMeasureHandler, deleteMeasureHandler } from '../../../../handler/seller/product/measure/measure.handler';
import { auth } from '../../../../middleware/auth';


const router = Router();


router.get('/category/:_id', auth, getPagingMeasureHandler)
router.get('/:_id', auth, getByIdMeasureHandler)
router.post('/', auth,  createMeasureHandler)
router.put('/:_id', auth, updateMeasureHandler)
router.delete('/:_id', auth, deleteMeasureHandler)

export default router;