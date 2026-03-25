import { Document, Types } from "mongoose"

export declare namespace INote {
  interface Doc extends Document {
    content: string
    person: Types.ObjectId | string | null
    organization: Types.ObjectId | string | null
    deal: Types.ObjectId | string | null
    owner: Types.ObjectId | string
  }
  interface Create {
    content: string
    person: Types.ObjectId | string | null
    organization: Types.ObjectId | string | null
    deal: Types.ObjectId | string | null
    owner: Types.ObjectId | string
  }
  interface Update {
    content?: string
    person?: Types.ObjectId | string | null
    organization?: Types.ObjectId | string | null
    deal?: Types.ObjectId | string | null
    owner?: Types.ObjectId | string
  }
  interface Query {
    person?: Types.ObjectId | string
    organization?: Types.ObjectId | string
    deal?: Types.ObjectId | string
    owner?: Types.ObjectId | string
    page?: number
    limit?: number
  }
}
