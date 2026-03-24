import { Types, Document, Date } from "mongoose"

export declare namespace IDeal {
  interface Doc extends Document {
    title: string
    value: {
      amount: number
      currency: string
    }
    stage:
      | "lead"
      | "contacted"
      | "meeting"
      | "proposal"
      | "negotiation"
      | "won"
      | "lost"
    person: Types.ObjectId | string
    organization: Types.ObjectId | string
    owner: Types.ObjectId | string
  }
  interface Create {
    title: string
    value: {
      amount: number
      currency: string
    }
    stage:
      | "lead"
      | "contacted"
      | "meeting"
      | "proposal"
      | "negotiation"
      | "won"
      | "lost"
    person: Types.ObjectId | string
    organization: Types.ObjectId | string
    owner: Types.ObjectId | string
  }
  interface Update {
    title?: string
    value?: {
      amount: number
      currency: string
    }
    stage?:
      | "lead"
      | "contacted"
      | "meeting"
      | "proposal"
      | "negotiation"
      | "won"
      | "lost"
    person?: Types.ObjectId | string
    organization?: Types.ObjectId | string
    owner?: Types.ObjectId | string
  }
  interface Query {
    _id?: Types.ObjectId | string
    title?: string
    stage?:
      | "lead"
      | "contacted"
      | "meeting"
      | "proposal"
      | "negotiation"
      | "won"
      | "lost"
    person?: Types.ObjectId | string
    organization?: Types.ObjectId | string
    owner?: Types.ObjectId | string
  }
}
