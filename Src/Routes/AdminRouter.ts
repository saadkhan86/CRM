import AdminController from '../Controller/AdminController'
const express = require('express')
const router = express.Router()
router.post('/signup', AdminController.create)
router.post('/login', AdminController.login)
export default router
