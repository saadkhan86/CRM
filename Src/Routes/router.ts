import express from 'express'
import AdminRouter from './AdminRouter'
import DealsRouter from './DealsRouter'
const router = express.Router()
router.use('/api/v1/admin', AdminRouter)
router.use('/api/v1/admin', DealsRouter)
export default router
