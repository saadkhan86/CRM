import mongoose from 'mongoose'
import DealsInterface from '../Interfaces/IDeal'
const Schema = mongoose.Schema
const DealsSchema = new Schema<DealsInterface.Doc>(
	{
		createdWith: {
			type: mongoose.Types.ObjectId,
			ref: 'Customer',
			required: true,
		},
		amount:{
			price: {
				type: Number,
				required: true,
			},
			currency: {
				type: String,
				required: true,
				default:"PKR"
			},
		},
		stage: {
			type: String,
			enum: [
				'qualified',
				'contactMade',
				'organization',
				'demoScheduled',
				'proposalSent',
				'negotiationStarted',
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
