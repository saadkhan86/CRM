import { Document, Types } from 'mongoose'

export declare namespace DealsInterface {
	interface Doc extends Document {
		createdWith: String | Types.ObjectId
		amount: {
			price: number
			currency: string
		}
		sourceChannel: string
		sourceChannelId: string
		expectedCloseDate: Date
		startDate?: Date
		stage:
			| 'qualified'
			| 'contactMade'
			| 'demoScheduled'
			| 'proposalSent'
			| 'negotiationStarted'
			| 'won'
			| 'lost'
	}
	interface create {
		createdWith: Types.ObjectId | string
		amount: {
			price: number
			currency?: string
		}
		sourceChannel: string
		sourceChannelId: string
		expectedCloseDate: Date
		startDate?: Date
		stage:Doc['stage']
			
	}
	interface update {
		amount?: {
			price?: number
			currency?: string
		}
		sourceChannel?: string
		sourceChannelId?: string
		expectedCloseDate?: Date
		startDate?: Date
		stage?:Doc['stage']
	}
}
export default DealsInterface
