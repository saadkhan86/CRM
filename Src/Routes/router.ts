import express from 'express'
import AdminRouter from './AdminRouter'
import CustomerRouter from './CustomerRouter'
import DealsRouter from './DealsRouter'
import ManagerCustomersRouter from './ManagerCustomersRouter'
import ManagerRouter from './AdminManagerRouter'
const router = express.Router()


router.use('/api/v1/admin', AdminRouter)
router.use('/api/v1/admin/manager', ManagerRouter)
router.use('/api/v1/admin/deals', DealsRouter)
router.use('/api/v1/admin/customers', CustomerRouter)
router.use('/api/v1/manager/customers', ManagerCustomersRouter)
export default router
