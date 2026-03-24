import { Types } from "mongoose"

export declare namespace IPeople {
  interface Doc {
    name: string
    email: { _id?: Types.ObjectId; address: string; label: string }[]
    phone: { _id?: Types.ObjectId; number: string; label: string }[]
    organization: Types.ObjectId | null
  }
  interface Create {
    name: string
    email: { address: string; label: string }[]
    phone: { number: string; label: string }[]
    organization: {
      name?: string
      _id?: Types.ObjectId | string
    }
  }
  interface Update {
    name: string
    email: { address: string; label: string }[]
    phone: { number: string; label: string }[]
    organization: {
      name?: string
      _id?: Types.ObjectId | string
    }
  }
  interface Query {
    name?: string
    email?: string
    phone?: string
    organization?: string
    page?: number
    limit?: number
  }
}
