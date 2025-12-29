import { Request, Response } from 'express'
import { Types } from 'mongoose'
import CustomerInterface from '../Interfaces/ICustomer'
import CustomerRepo from '../Repositories/CustomerRepo'
import DealsRepo from '../Repositories/DealsRepo'

const DealsController = {
	create: async (req: Request, res: Response, next: Function) => {
		try {
			const { createdWith, name, organization, contact, email } = req.body
			let customer: undefined | CustomerInterface.Doc
			const createdBy: string = req.user!.role
			if (!createdWith) {
				customer = await CustomerRepo.create(createdBy, req.body)
			} else {
				const cusQuery = await CustomerRepo.query(createdWith)

				if (!cusQuery) {
					return res.status(404).json({
						success: false,
						message: 'Customer not found, create a new customer',
					})
				}

				customer = cusQuery
			}
			const deal = await DealsRepo.create({
				createdWith: customer?._id,
				...req.body,
			})
			res.status(200).json({ success: true, data: deal })
		} catch (error) {
			return next(error, req, res)
		}
	},
	update: async (req: Request, res: Response, next: Function) => {
		try {
			const deal = await DealsRepo.update(req.params.id, req.body)
			res.status(200).json({ success: true, data: deal })
		} catch (error) {
			return next(error, req, res)
		}
	},
	delete: async (req: Request, res: Response, next: Function) => {
		try {
			const deal = await DealsRepo.delete(req.params.id)
			res.status(200).json({ success: true, data: 'Deal deleted' })
		} catch (error) {
			return next(error, req, res)
		}
	},
	query: async (req: Request, res: Response, next: Function) => {
		try {
			var id: string | Types.ObjectId
			id = req.params.id
			const deals = await DealsRepo.query(id)
			res.status(200).json({ success: true, data: deals })
		} catch (error) {
			return next(error, req, res)
		}
	},
}
export default DealsController
