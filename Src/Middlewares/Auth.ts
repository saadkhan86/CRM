import { Request, Response } from 'express'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import Admin from '../Models/Admin'
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
const AdminAuth = {
	auth: async (req: Request, res: Response, next: Function) => {
		let token: any
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1]
		}

		if (!token) {
			throw new ErrorHandler(401,'Access Denied. No token provided.')
		}
		const isValid = await jwt.verify(token, process.env.JWT_SECRET)
		if (!isValid) {
			throw new ErrorHandler(405, 'invalid or expired token')
		}
		const user = await Admin.findById(isValid.id)
		if (!user) {
			throw new ErrorHandler(404, 'Admin not found')
		}
		return next()
	},
}
export default AdminAuth
