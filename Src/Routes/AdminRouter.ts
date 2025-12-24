import AdminController from '../Controller/AdminController'
import AdminAuth from '../Middlewares/Auth'
const express = require('express')
const AdminRouter = express.Router()
AdminRouter.post('/signup', AdminController.create)
AdminRouter.post('/login', AdminController.login)
AdminRouter.patch("/:id",AdminAuth.auth,AdminController.update)
export default AdminRouter
