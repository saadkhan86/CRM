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
		stage:
			| 'qualified'
			| 'contactMade'
			| 'demoScheduled'
			| 'proposalSent'
			| 'negotiationStarted'
			| 'won'
			| 'lost'
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
		stage?:
			| 'qualified'
			| 'contactMade'
			| 'demoScheduled'
			| 'proposalSent'
			| 'negotiationStarted'
			| 'won'
			| 'lost'
	}
	interface query {
		id?: Types.ObjectId
		currency?: string
		page?: number
		limit?: number
		order?: number
		search?: string
	}
}
export default DealsInterface
