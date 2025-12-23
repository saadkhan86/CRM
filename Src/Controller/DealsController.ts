import { Request, Response } from 'express'
import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import DealsInterface from '../Interfaces/DealsInterface'
import CustomerRepo from '../Repositories/CustomerRepo'
import DealsRepo from '../Repositories/DealsRepo'
import ExtraFunctions from '../Utils/ExtraFunctions'

const DealsController = {
	create: async (req: Request, res: Response, next: Function) => {
		try {
			var id: Types.ObjectId

			const { name, email, organization, contact } = req.body
			const newCustomer = await CustomerRepo.create({
				...(req.params.id && { id: req.params.id }),
				...req.body,
			})
			id = newCustomer._id
			req.body.createdWith = id
			req.body.stage = await ExtraFunctions.normalizeStage(req.body.stage)
			const deal = await DealsRepo.create({ ...req.body })
			// deal.stage=await ExtraFunctions.denormalizeStage(deal.stage);
			res.status(200).json({ success: true, data: deal })
		} catch (error) {
			return next(error, req, res)
		}
	},
	get: async (req: Request, res: Response, next: Function) => {
		try {
			const id = req.params.id
			if (!id) {
				throw new ErrorHandler(400, 'Deal id not provided')
			}
			const deal = await DealsRepo.get(id)
			// deal.stage=await ExtraFunctions.denormalizeStage(deal.stage) ;
			res.status(200).json({ success: true, deal: deal })
		} catch (error) {
			next(req, res, next)
		}
	},
	update: async (req: Request, res: Response, next: Function) => {
		try {
			req.body.stage = await ExtraFunctions.normalizeStage(req.body.stage)
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
			if (typeof req.query.stage === 'string') {
				req.query.stage = await ExtraFunctions.normalizeStage(req.query.stage)
			}
			const customerId = req.query.id as string
			const query: DealsInterface.query = {
				page: Number(req.query.page) || 1,
				limit: req.query.limit ? Number(req.query.limit) : 10,
				order: Number(req.query.order) === -1 ? -1 : 1,
				search:
					typeof req.query.search === 'string' ? req.query.search : undefined,
			}
			const deals = await DealsRepo.query({
				...(customerId ? { customerId } : {}),
				...query,
			})
			res.status(200).json({ success: true, data: deals })
		} catch (error) {
			return next(error, req, res)
		}
	},
}
export default DealsController
