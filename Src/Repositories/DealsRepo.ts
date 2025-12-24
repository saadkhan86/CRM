import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import DealsInterface from '../Interfaces/IDeal'
import Deals from '../Models/Deals.model'

class DealsRepo {
	public async create(data: DealsInterface.create) {
		if (
			!data.createdWith ||
			!data.stage ||
			!data.amount.price||
			!data.sourceChannel ||
			!data.sourceChannelId ||
			!data.expectedCloseDate
		) {
			throw new ErrorHandler(400, 'provide all required fields')
		}
		var deal = await Deals.create(data)
		deal = await deal.populate('createdWith')
		return deal
	}
	public async get(id: string) {
		if (!id) {
			throw new ErrorHandler(400, 'Enter user id to get deal')
		}
		const deal = await Deals.findById(id).populate('createdWith')
		if (!deal || deal === undefined || deal === null) {
			throw new ErrorHandler(404, 'Deal not found')
		}
		return deal
	}
	public async update(
		id: Types.ObjectId | string,
		data: DealsInterface.update
	) {
		if (!id) {
			throw new ErrorHandler(400, 'Deal ID is required to update deal')
		}
		const updatedDeal = await Deals.findByIdAndUpdate(id, data, {
			new: true,
		})
			.populate('createdWith')
			.lean()
		return updatedDeal
	}
	public async delete(id: string) {
		const db = await Deals.findByIdAndDelete(id)
		if (!db) {
			throw new ErrorHandler(404, 'Deal not found')
		}
		return db
	}
	public async query(id: Types.ObjectId | string) {
		const deals = await Deals.find({
			$or: [{ _id: id }, { createdWith: id }],
		}).populate('createdWith')
		return deals
	}
}
export default new DealsRepo()
