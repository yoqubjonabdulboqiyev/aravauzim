

import { Router } from 'express';
import { createRegionHandler, deleteRegionHandler, getByIdRegionHandler, getPagingRegionHandler, updateRegionHandler } from '../../handler/region/region.handler';
import { auth } from '../../middleware/auth';


const router = Router();


router.get('/', auth, getPagingRegionHandler)
router.get('/:_id', auth, getByIdRegionHandler)
router.post('/', auth, createRegionHandler)
router.put('/:_id', auth, updateRegionHandler)
router.delete('/:_id', auth, deleteRegionHandler)

export default router;