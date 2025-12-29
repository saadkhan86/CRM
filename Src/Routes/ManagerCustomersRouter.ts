import express from 'express'
import CustomerController from '../Controller/CustomerController'
import Authentication from '../Middlewares/Auth'
const ManagerCustomersRouter = express.Router()
ManagerCustomersRouter.post(
	'/',
	Authentication.authManager,
	CustomerController.create
)
ManagerCustomersRouter.patch(
	'/:id',
	Authentication.authManager,
	CustomerController.update
)
ManagerCustomersRouter.delete(
	'/:id',
	Authentication.authManager,
	CustomerController.delete
)
export default ManagerCustomersRouter