


import { Router } from "express";
import { getPagingRoleHandler, createRoleHandler, updateRoleHandler, deleteRoleHandler, getByIdRoleHandler } from "../../handler/admin/role/role.handler";
import { auth } from "../../middleware/auth";


const router = Router();

router.get('/', auth, getPagingRoleHandler)
router.get('/:_id', auth, getByIdRoleHandler)
router.post('/', auth, createRoleHandler)
router.put('/:_id', auth, updateRoleHandler)
router.delete('/:_id', auth, deleteRoleHandler)


export default router;