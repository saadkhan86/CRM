import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import CustomerInterface from '../Interfaces/ICustomer'
import Customer from '../Models/Customer.model'
class CustomerRepo {
	public async create(createdBy: string, data: CustomerInterface.create) {
		data.createdBy = createdBy
		const { name, email, organization, contact } = data
		const customer = new Customer(data)
		return await customer.save()
	}
	public async update(
		createdBy: string,
		id: Types.ObjectId | string,
		data: CustomerInterface.update
	) {
		var customer = await Customer.findById(id)
		if (!customer) {
			throw new ErrorHandler(400, 'Customer not found')
		}
		if (customer.createdBy === 'admin' && createdBy === 'manager') {
			throw new ErrorHandler(403, 'access for that customer is forbidden')
		}
		if (data.name) {
			customer.name = data.name
		}
		if (data.email) {
			customer.email = data.email
		}
		if (data.organization) {
			customer.organization = data.organization
		}
		if (data.contact) {
			customer.contact = data.contact
		}
		customer = await Customer.findByIdAndUpdate(id, customer, { new: true })
		return customer
	}

	public async delete(role:string,id: Types.ObjectId | string) {
		var customer=await Customer.findById(id)
		if( customer && customer!.createdBy==='admin' && role==='manager'){
			throw new ErrorHandler(403,'access for that customer is forbidden')
		}
		customer = await Customer.findByIdAndDelete(id);
		return customer
	}

	public async query(query: Types.ObjectId | string) {
		const customer = await Customer.findById(query)
		return customer
	}
}
export default new CustomerRepo()
