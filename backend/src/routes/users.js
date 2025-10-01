import { Router } from 'express'
import { authRequired } from '../middleware/auth.js'
import { me, updateMe } from '../controllers/userController.js'

const router = Router()
router.get('/me', authRequired, me)
router.put('/me', authRequired, updateMe)

export default router
