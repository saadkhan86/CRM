import AdminController from '../Controller/AdminController'
import Authentication from '../Middlewares/Auth'
const express = require('express')
const AdminRouter = express.Router()
AdminRouter.post('/signup', AdminController.create)
AdminRouter.post('/login', AdminController.login)
AdminRouter.patch("/:id",Authentication.auth,AdminController.update)
export default AdminRouter
