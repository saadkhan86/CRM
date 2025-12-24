import express from 'express'
import AdminRouter from './AdminRouter'
import CustomerRouter from './CustomerRouter'
import DealsRouter from './DealsRouter'
const router = express.Router()
router.use('/api/v1/admin', AdminRouter)
router.use('/api/v1/admin', DealsRouter)
router.use('/api/v1/admin', CustomerRouter)
export default router
