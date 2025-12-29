import { Request, Response } from 'express'
import { Types } from 'mongoose'
import ManagerRepo from '../Repositories/ManagerRepo'
const ManagerController = {
	create: async (req: Request, res: Response, next: Function) => {
		try {
			const { name, email } = req.body
			const manager = await ManagerRepo.create({ name, email })
			res.status(200).json({ success: true, data: manager })
		} catch (error) {
			next(error, req, res)
		}
	},
	delete: async (req: Request, res: Response, next: Function) => {
		try {
			const id = new Types.ObjectId(req.params.id)
			const manager = await ManagerRepo.delete(id)
			res
				.status(200)
				.json({ success: true, data: 'Manager deleted successfully' })
		} catch (error) {
			next(error, req, res)
		}
	},
	update: async (req: Request, res: Response, next: Function) => {
		try {
			const id = new Types.ObjectId(req.params.id)
			const manager = await ManagerRepo.update(id, { ...req.body })
			res.status(200).json({ success: true, data: manager })
		} catch (error) {
			next(error, req, res)
		}
	},
	query: async (req: Request, res: Response, next: Function) => {
		try {
			const id = req.params.id
			const manager = await ManagerRepo.query(id)
			res.status(200).json({ success: true, data: manager })
		} catch (error) {
			next(error, req, res)
		}
	},
}
export default ManagerController
