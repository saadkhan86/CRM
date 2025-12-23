import { Request, Response } from 'express'
import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import CustomerInterface from '../Interfaces/CustomerInterface'
import CustomerRepo from '../Repositories/CustomerRepo'

const CustomerController = {
	create: async (req: Request, res: Response, next: Function) => {
		try {
			let { name, email, organization, contact } = req.body
			if (!email || !name || !organization || !contact) {
				throw new ErrorHandler(400, 'fill all required fields')
			}
			const newCustomer = await CustomerRepo.create(req.body)
			res.status(200).json({ success: true, data: newCustomer })
		} catch (error) {
			return next(error, req, res)
		}
	},
	update: async (req: Request, res: Response, next: Function) => {
		try {
			if (!req.params.id) {
				throw new ErrorHandler(400, 'please provide customer refference')
			}
			const updateCustomer = await CustomerRepo.update(req.params.id, req.body)
			res.status(200).json({ success: true, data: updateCustomer })
		} catch (error) {
			return next(error, req, res)
		}
	},
	delete: async (req: Request, res: Response, next: Function) => {
		try {
			const deleteCustomer = await CustomerRepo.delete(req.params.id)
			res
				.status(200)
				.json({ success: true, data: 'customer deleted successfuly' })
		} catch (error) {
			return next(error, req, res)
		}
	},
	query: async (req: Request, res: Response, next: Function) => {
		try {
			const id = req.query.id as string
			if (id) {
				if (!Types.ObjectId.isValid(id)) {
					throw new Error('Invalid ObjectId provided')
				}
			}
			const objectId = new Types.ObjectId(id)
			const query: CustomerInterface.query = {
				page: Number(req.query.page) || 1,
				limit: req.query.limit ? Number(req.query.limit) : 10,
				order: Number(req.query.order) === -1 ? -1 : 1,
				search:
					typeof req.query.search === 'string' ? req.query.search : undefined,
			}
			const customers = await CustomerRepo.query({
				...(objectId ? objectId : {}),
				...query,
			})
			res.status(200).json({ success: true, data: customers })
		} catch (error) {
			return next(error, req, res)
		}
	},
}
export default CustomerController
