import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import CustomerInterface from '../Interfaces/ICustomer'
import Customer from '../Models/Customer.model'
class CustomerRepo {
	public async create(data: CustomerInterface.create) {
		const { name, email, organization, contact } = data
		const customer = new Customer(data)
		return await customer.save()
	}
	public async update(
		id: Types.ObjectId | string,
		data: CustomerInterface.update
	) {
		var customer = await Customer.findById(id)
		if (!customer) {
			throw new ErrorHandler(400, 'Customer not found')
		}
		customer = await Customer.findByIdAndUpdate(id, data, { new: true })
		return customer
	}

	public async delete(id: Types.ObjectId | string) {
		const customer = await Customer.findByIdAndDelete(id)
		return customer
	}

	public async query(query: Types.ObjectId | string) {
		const customers = await Customer.findById(query)
		return customers
	}
}
export default new CustomerRepo()
