import { Document, Types } from 'mongoose'

export declare namespace DealsInterface {
	interface Doc extends Document {
		title: string
		createdBy: Types.ObjectId
		phoneNo:string
		email:string
		contact: string
		currency: string
		organization: string
		amount: number
		sourceChannel: string
		sourceChannelId: string
		expectedCloseDate: Date
		startDate?: Date
		stage:
			| 'qualified'
			| 'contact made'
			| 'Demo Scheduled'
			| 'Proposal Sent'
			| 'negotiation Started'
			| 'won'
			| 'lost'
	}
	interface create {
		title: string
		contact: string
		phoneNo:string,
		email:string
		organization: string
		amount: number
		currency?: string
		sourceChannel: string
		sourceChannelId: string
		expectedCloseDate: Date
		startDate?: Date
		stage:
			| 'qualified'
			| 'contact made'
			| 'Demo Scheduled'
			| 'Proposal Sent'
			| 'negotiation Started'
			| 'won'
			| 'lost'
	}
	interface update {
		dealId?: Types.ObjectId | string
		phoneNo?:string
		email?:string
		title?: string
		contact?: string
		organization?: string
		currency?: string
		amount?: number
		sourceChannel?: string
		sourceChannelId?: string
		expectedCloseDate?: Date
		startDate?: Date
		stage?:
			| 'qualified'
			| 'contact made'
			| 'Demo Scheduled'
			| 'Proposal Sent'
			| 'negotiation Started'
			| 'won'
			| 'lost'
	}
	interface remove {
		id: Types.ObjectId
	}
	interface query {
		email?:string
		phoneNo?:string
		currency?: string
		page?: number
		limit?: number
		order?: number
		search?: string
		id?: Types.ObjectId | string
	}
}
export default DealsInterface
