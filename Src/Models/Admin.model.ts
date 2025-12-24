import mongoose from 'mongoose'
import AdminInterface from '../Interfaces/IAdmin'
const Schema = mongoose.Schema
const AdminSchema = new Schema<AdminInterface.Doc>(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ timestamps: true }
)
export default mongoose.model<AdminInterface.Doc>('Admin', AdminSchema)
