import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import DealsInterface from '../Interfaces/IDeal'
import Deals from '../Models/Deals.model'

class DealsRepo {
	public async create(data: DealsInterface.create) {
		if (
			!data.createdWith ||
			!data.stage ||
			!data.amount.price ||
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
		const existingDeal = await Deals.findById(id)
		if (!existingDeal) {
			throw new ErrorHandler(404, 'Deal not found with the given id')
		}
		if (data.amount) {
			data.amount = {
				price: data.amount.price ?? existingDeal.amount.price,
				currency: data.amount.currency ?? existingDeal.amount.currency,
			}
		}
		const updatedDeal = await Deals.findByIdAndUpdate(id, data, {
			new: true,
		})
			.populate('createdWith')
			.lean()

		return updatedDeal
	}
	public async delete(id: string) {
		const deal = await Deals.findByIdAndDelete(id)
		if (!deal) {
			throw new ErrorHandler(404, 'Deal not found')
		}
		return deal
	}
	public async query(id: Types.ObjectId | string) {
		const deal = await Deals.find({
			$or: [{ _id: id }, { createdWith: id }],
		}).populate('createdWith')
		return deal
	}
}
export default new DealsRepo()
