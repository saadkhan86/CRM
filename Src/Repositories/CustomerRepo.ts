import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import CustomerInterface from '../Interfaces/CustomerInterface'
import Customer from '../Models/Customer'
class CustomerRepo {
	public async create(data: CustomerInterface.create) {
		const user = await Customer.findOne({ email: data.email })
		if (user) {
			throw new ErrorHandler(409, 'user alredy exists')
		}
		const db = new Customer(data)
		return await db.save()
	}
	public async createForDeals(data: CustomerInterface.create) {
		const customerInfo = data.id
			? { _id: new Types.ObjectId(data.id) }
			: { email: data.email }
		const user = await Customer.findOne(customerInfo)
		if (user) {
			return user
		}
		const db = new Customer(data)
		return await db.save()
	}

	public async update(
		id: Types.ObjectId | string,
		data: CustomerInterface.update
	) {
		const oldCustomer = await Customer.findById(id)
		if (!oldCustomer) {
			throw new ErrorHandler(400, 'Customer not found')
		}
		const updateObject: any = {}
		const availableFields = [
			'name',
			'email',
			'contact',
			'organization',
		] as const
		availableFields.forEach((field) => {
			if (data[field] !== undefined && data[field] !== null) {
				if (data[field] !== oldCustomer[field]) {
					updateObject[field] = data[field]
				}
			}
		})
		if (Object.keys(updateObject).length === 0) {
			return oldCustomer
		}
		const db = await Customer.findByIdAndUpdate(
			id,
			{ $set: updateObject },
			{ new: true }
		)
		return db
	}

	public async delete(id: Types.ObjectId | string) {
		const db = await Customer.findByIdAndDelete(id)
		if (!db) {
			throw new ErrorHandler(400, 'Customer not found')
		}
		return db
	}

	public async query(query: CustomerInterface.query) {
		if (query.id) {
			let customer = await Customer.findById(query.id)
			if (!customer) {
				throw new ErrorHandler(404, 'customer not found with the given ID')
			}
			return customer
		}
		let searchQuery: any
		const page: number = Number(query.page) ? Number(query.page) : 1
		const limit: number = Number(query.limit) ? Number(query.limit) : 10
		if (typeof query.search === 'string' && query.search.trim()) {
			const search = query.search.trim()
			searchQuery = {
				$or: [
					{ name: { $regex: search, $options: 'i' } },
					{ email: { $regex: search, $options: 'i' } },
					{ organization: { $regex: search, $options: 'i' } },
				],
			}
		} else {
			searchQuery = {}
		}
		const customers = await Customer.find(searchQuery)
			.sort({ name: query.order ? query.order : 1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean()
		if (customers.length === 0) {
			throw new ErrorHandler(400, 'No Customer exist in your Database')
		}
		return customers
	}
}
export default new CustomerRepo()
