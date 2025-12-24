import mongoose from 'mongoose'
import CustomerInterface from '../Interfaces/ICustomer'
const Schema = mongoose.Schema
const CustomerSchema = new Schema<CustomerInterface.Doc>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		organization: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)
export default mongoose.model<CustomerInterface.Doc>('Customer', CustomerSchema)
