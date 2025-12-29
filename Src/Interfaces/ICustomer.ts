import { Document, Types } from 'mongoose'

export declare namespace CustomerInterface {
	interface Doc extends Document {
		createdBy:string
		name: string
		email: string
		organization: string
		contact: string
	}
	interface create {
		createdBy:string
		contact: string
		name: string
		email: string
		organization: string
	}
	interface update {
		contact?: string
		name?: string
		email?: string
		organization?: string
	}
}

export default CustomerInterface
