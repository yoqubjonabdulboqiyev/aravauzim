

import { Router } from 'express';
import { getPagingSellerCommentHandler, SellerCommentCountHandler } from '../../../handler/seller/comment/comment.handler';
import { auth } from '../../../middleware/auth';



const router = Router();


router.get('/:_id', auth, getPagingSellerCommentHandler)
router.get('/count/:_id', auth, SellerCommentCountHandler)

export default router;