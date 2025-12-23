import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import DealsInterface from '../Interfaces/DealsInterface'
import Deals from '../Models/Deals'

class DealsRepo {
	public async create(data: DealsInterface.create) {
		if (
			!data.createdWith||
			!data.stage ||
			!data.amount ||
			!data.sourceChannel ||
			!data.sourceChannelId ||
			!data.expectedCloseDate
		) {
			throw new ErrorHandler(400, 'please provide all required fields')
		}
		const db = new Deals(data)
		return await (await db.save()).populate("createdWith");
	}
	public async get(id: string) {
		if (!id) {
			throw new ErrorHandler(400, 'Enter user id to get deal')
		}
		const deal = await Deals.findById(id).populate("createdWith")
		if (!deal || deal===undefined || deal===null) {
			throw new ErrorHandler(404, 'Deal not found')
		}
		return deal
	}
	public async update(id:Types.ObjectId | string,data: DealsInterface.update) {
		if (!id) {
			throw new ErrorHandler(400, 'Deal ID is required to update deal')
		}
		const updatedDeal = await Deals.findByIdAndUpdate(
			id,
			data,
			{
				new: true,
			}
		).populate("createdWith").lean()
		return updatedDeal
	}
	public async delete(id: string) {
		const db = await Deals.findByIdAndDelete(id)
		if (!db) {
			throw new ErrorHandler(404, 'Deal not found')
		}
		return db
	}
	public async query(queryObject: DealsInterface.query) {
		if (queryObject.id) {
			let deal = await Deals.findById({createdWith:queryObject.id}).populate("createdWith");
			if (!deal) {
				throw new ErrorHandler(404, 'Deal not found with the given ID')
			}
			return deal
		}
		let searchQuery: any
		const page = queryObject.page || 1
		const limit = queryObject.limit || 10
		const skip = (page - 1) * limit
		const order = queryObject.order === -1 ? -1 : 1
		if (typeof queryObject.search === 'string' && queryObject.search.trim()) {
			const search = queryObject.search.trim()
			searchQuery = {
				$or: [
					{ title: { $regex: search, $options: 'i' } },
					{ stage: { $regex: search, $options: 'i' } },
					{ sourceChannel: { $regex: search, $options: 'i' } },
					{ sourceChannelId: { $regex: search, $options: 'i' } },
					{ contact: { $regex: search, $options: 'i' } },
					{ organization: { $regex: search, $options: 'i' } },
					{ currency: { $regex: search, $options: 'i' } },
					{ phoneNo: { $regex: search, $options: 'i' } },
					{ email: { $regex: search, $options: 'i' } },
				],
			}
		} else {
			searchQuery = {}
		}
		const db = await Deals.find(searchQuery).populate("createdWith")
			.sort({ startDate: order })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean()
		if (!db || db.length === 0) {
			throw new ErrorHandler(404, 'No deals found')
		}
		return db
	}
}
export default new DealsRepo()
