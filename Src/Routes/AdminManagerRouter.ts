import ManagerController from '../Controller/ManagerController'
import Authentication from '../Middlewares/Auth'
const express = require('express')
const ManagerRouter = express.Router()

ManagerRouter.post('/', Authentication.auth, ManagerController.create)
ManagerRouter.patch('/:id', Authentication.auth, ManagerController.update)
ManagerRouter.get('/:id', Authentication.auth, ManagerController.query)
ManagerRouter.delete('/:id', Authentication.auth, ManagerController.delete)
export default ManagerRouter
