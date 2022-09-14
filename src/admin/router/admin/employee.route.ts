

import { Router } from 'express';
import { getPagingEmployeeHandler, createEmployeeHandler, updateEmployeeHandler, deleteEmployeeHandler, signInHandler, getByIdEmployeeHandler } from '../../handler/admin/employe/employee.handler';
import { auth } from '../../middleware/auth';


const router = Router();


router.get('/', auth, getPagingEmployeeHandler)
router.get('/:_id', auth, getByIdEmployeeHandler)
router.post('/', auth, createEmployeeHandler)
router.put('/:_id', auth, updateEmployeeHandler)
router.delete('/:_id', auth, deleteEmployeeHandler)

router.post('/signIn', signInHandler)
export default router;