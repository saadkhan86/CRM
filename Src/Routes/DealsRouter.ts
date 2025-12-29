import DealsController from '../Controller/DealsController'
import Authentication from '../Middlewares/Auth'
const express = require('express')
const DealsRouter = express.Router()
DealsRouter.get('/:id', Authentication.auth, DealsController.query)
DealsRouter.post('/', Authentication.auth, DealsController.create)
DealsRouter.patch('/:id', Authentication.auth, DealsController.update)
DealsRouter.delete('/:id', Authentication.auth, DealsController.delete)
export default DealsRouter
