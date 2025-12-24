import express from 'express'
import CustomerController from '../Controller/CustomerController'
import AdminAuth from '../Middlewares/Auth'
const CustomerRouter = express.Router()

CustomerRouter.post('/customers', AdminAuth.auth, CustomerController.create)
CustomerRouter.get('/customers/:id', AdminAuth.auth, CustomerController.query)
CustomerRouter.patch('/customers/:id', AdminAuth.auth, CustomerController.update)
CustomerRouter.delete('/customers/:id', AdminAuth.auth, CustomerController.delete)

export default CustomerRouter