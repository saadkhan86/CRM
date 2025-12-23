import Customer from './Customer'
import mongoose from 'mongoose'
import DealsInterface from '../Interfaces/DealsInterface'
const Schema = mongoose.Schema
const DealsSchema = new Schema<DealsInterface.Doc>(
	{
		createdWith:{
			type:mongoose.Types.ObjectId,
			ref:"Customer",
			required:true,	
		},
		amount: { type: Number, required: true },
		stage: {
			type: String,
			enum: [
				'qualified',
				'contactmade',
				'organization',
				'demoscheduled',
				'proposalsent',
				'negotiationstarted',
				'won',
				'lost',
			],
			default: 'qualified',
		},
		startDate: { type: Date, required: true, default: new Date() },
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
