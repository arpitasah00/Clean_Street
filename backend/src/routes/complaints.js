import { Router } from 'express'
import { authRequired } from '../middleware/auth.js'
import { listMine, createComplaint, getComplaint, updateComplaint } from '../controllers/complaintController.js'

const router = Router()
router.get('/mine', authRequired, listMine)
router.post('/', authRequired, createComplaint)
router.get('/:id', authRequired, getComplaint)
router.put('/:id', authRequired, updateComplaint)

export default router
