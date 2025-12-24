import { Request, Response } from 'express'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
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
				throw new ErrorHandler(400, 'customer id not provided')
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
			if (!deleteCustomer) {
				throw new ErrorHandler(200, 'Customer not found')
			}
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
			const customers = await CustomerRepo.query(id)
			res.status(200).json({ success: true, data: customers })
		} catch (error) {
			return next(error, req, res)
		}
	},
}
export default CustomerController
