import { Types } from "mongoose"
import { Document } from "mongoose"

export declare namespace IOrganization {
  interface Doc extends Document {
    name: string
    address: string
    owner: Types.ObjectId | string
    peopleCount: number
  }
  interface Create {
    name: string
    address: string
    owner: Types.ObjectId | string
  }
  interface Update {
    _id: Types.ObjectId | string
    name?: string
    address?: string
    owner?: Types.ObjectId | string
  }
  interface Query {
    _id?: Types.ObjectId | string
    name?: string
    address?: string
    owner?: Types.ObjectId | string
    page?: number
    limit?: number
  }
  interface Delete {
    _id: Types.ObjectId | string
  }
}
