import { Document, Types } from 'mongoose'

export declare namespace DealsInterface {
	interface Doc extends Document {
		createdWith: String | Types.ObjectId
		amount: number
		sourceChannel: string
		sourceChannelId: string
		expectedCloseDate: Date
		startDate?: Date
		stage:
			| 'qualified'
			| 'contactmade'
			| 'demoscheduled'
			| 'proposalsent'
			| 'negotiationstarted'
			| 'won'
			| 'lost'
	}
	interface create {
		createdWith: Types.ObjectId | string
		amount: number
		sourceChannel: string
		sourceChannelId: string
		expectedCloseDate: Date
		startDate?: Date
		stage:
			| 'qualified'
			| 'contactmade'
			| 'demoscheduled'
			| 'proposalsent'
			| 'negotiationstarted'
			| 'won'
			| 'lost'
	}
	interface update {
		amount?: number
		sourceChannel?: string
		sourceChannelId?: string
		expectedCloseDate?: Date
		startDate?: Date
		stage?:
			| 'qualified'
			| 'contactmade'
			| 'demoscheduled'
			| 'proposalsent'
			| 'negotiationstarted'
			| 'won'
			| 'lost'
	}
	interface remove {
		dealId: Types.ObjectId | string
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
