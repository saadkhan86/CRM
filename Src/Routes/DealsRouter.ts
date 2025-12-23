import DealsController from '../Controller/DealsController'
import AdminAuth from '../Middlewares/Auth'
const express = require('express')
const router = express.Router()
router.get('/deals', AdminAuth.auth, DealsController.query)
router.post('/deals', AdminAuth.auth, DealsController.create)
router.patch('/deals/:id', AdminAuth.auth, DealsController.update)
router.delete('/deals/:id', AdminAuth.auth, DealsController.delete)
export default router
