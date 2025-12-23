import express from 'express'
import AdminRouter from './AdminRouter'
import DealsRouter from './DealsRouter'
import customerRouter from "./CustomerRouter";
const router = express.Router()
router.use('/api/v1/admin', AdminRouter)
router.use('/api/v1/admin', DealsRouter)
router.use("/api/v1/admin",customerRouter);
export default router
