import { Request, Response } from 'express'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import Admin from '../Models/Admin.model'
import ManagerModel from '../Models/Manager.model'
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
const Authentication = {
	auth: async (req: Request, res: Response, next: Function) => {
		let token: any
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1]
		}

		if (!token) {
			throw new ErrorHandler(401, 'Access Denied. No token provided.')
		}
		const isValid = await jwt.verify(token, process.env.JWT_SECRET)
		if (!isValid) {
			throw new ErrorHandler(405, 'invalid or expired token')
		}
		var user: any = {}
		user = await Admin.findById(isValid.id)
		if (!user || user.length === 0) {
			throw new ErrorHandler(404, 'user not found')
		}
		req.user = {
			id: user._id,
			role: user.role,
		}
		return next()
	},
	authManager: async (req: Request, res: Response, next: Function) => {
		var email: any
		var name:any
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			email = req.headers.authorization.split(' ')[1]
			name=req.headers.authorization.split(' ')[2]
		}
		if (!email || !name) {
			throw new ErrorHandler(403, 'Acess forbidden')
		}
		const manager = await ManagerModel.findOne({email,name})
		if (!manager) {
			throw new ErrorHandler(404, 'Manager not found')
		}
		req.user = {
			id: manager._id.toString(),
			role: manager.role.toString(),
		}
		next()
	},
}
export default Authentication
