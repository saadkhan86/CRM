import { Request, Response } from 'express'
import DealsInterface from '../Interfaces/DealsInterface'
import Deals from '../Models/Deals'
import DealsRepo from '../Repositories/DealsRepo'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

const DealsController = {
	create: async (req: Request, res: Response, next: Function) => {
		try {
			const deal = await DealsRepo.create({ ...req.body})
			res.status(200).json({ success: true, data: deal })
		} catch (error) {
			return next(error, req, res)
		}
	},
	update: async (req: Request, res: Response, next: Function) => {
		try {
			const deal = await DealsRepo.update({
				...req.body,
				dealId: req.params.id,
			})
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
			const id=req.query.id as string;
			const query: DealsInterface.query = {
				page: Number(req.query.page) || 1,
				limit: req.query.limit ? Number(req.query.limit) : 10,
				order: Number(req.query.order) === -1 ? -1 : 1,
				search:
					typeof req.query.search === 'string' ? req.query.search : undefined,
			}
			const deals = await DealsRepo.query({...(id?{id}:{}),...query})
			res.status(200).json({ success: true, data: deals })
		} catch (error) {
			return next(error, req, res)
		}
	},
}
export default DealsController
