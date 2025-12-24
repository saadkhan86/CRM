import DealsController from '../Controller/DealsController'
import AdminAuth from '../Middlewares/Auth'
const express = require('express')
const DealsRouter = express.Router()
DealsRouter.get('/deals/:id', AdminAuth.auth, DealsController.query)
DealsRouter.post('/deals', AdminAuth.auth, DealsController.create)
DealsRouter.patch('/deals/:id', AdminAuth.auth, DealsController.update)
DealsRouter.delete('/deals/:id', AdminAuth.auth, DealsController.delete)
export default DealsRouter
