import express from 'express'
import CustomerController from '../Controller/CustomerController'
import Authentication from '../Middlewares/Auth'
const CustomerRouter = express.Router()

CustomerRouter.post('/', Authentication.auth, CustomerController.create)

CustomerRouter.get('/:id', Authentication.auth, CustomerController.query)
CustomerRouter.patch('/:id', Authentication.auth, CustomerController.update)
CustomerRouter.delete('/:id', Authentication.auth, CustomerController.delete)

export default CustomerRouter
