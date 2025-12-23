import mongoose from 'mongoose'
import DealsInterface from '../Interfaces/DealsInterface'
const Schema = mongoose.Schema
const DealsSchema = new Schema<DealsInterface.Doc>(
	{
		title: { type: String, required: true },
		contact: {
			type: String,
			required: true,
		},
		phoneNo:{
			type:String,
			required:true
		},
		email:{
			type:String,
			required:true
		}
		,
		organization: {
			type: String,
			required: true,
		},
		amount: { type: Number, required: true },
		currency:{type:String,required:true,default:"PKR"},
		stage: {
			type: String,
			enum: [
				'qualified',
				'contact made',
				'Demo Scheduled',
				'Proposal Sent',
				'negotiation Started',
				'won',
				'lost',
			],
			default: 'qualified',
		},
		startDate: { type: Date, required: true, default: Date.now },
		expectedCloseDate: { type: Date, required: true },
		sourceChannel: {
			type: String,
			required: true,
		},
		sourceChannelId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)
export default mongoose.model<DealsInterface.Doc>('Deals', DealsSchema)
