import express from 'express'
import CustomerController from '../Controller/CustomerController'
import AdminAuth from '../Middlewares/Auth'
const router = express.Router()

router.post('/customers', AdminAuth.auth, CustomerController.create)
router.get('/customers/:id', AdminAuth.auth, CustomerController.query)
router.patch('/customers/:id', AdminAuth.auth, CustomerController.update)
router.delete('/customers/:id', AdminAuth.auth, CustomerController.delete)

export default router
