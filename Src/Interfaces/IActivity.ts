import { Date, Document, Types } from "mongoose"

export declare namespace IActivity {
  interface Doc extends Document {
    title: string
    type: string
    description: string
    dueDate: Date
    completedDate: Date
    status: "pending" | "completed"
    person: Types.ObjectId
    deal: Types.ObjectId
    organization: Types.ObjectId | string
    owner: Types.ObjectId | string
  }
  interface Create {
    title: string
    type: string
    description: string
    dueDate: Date
    completedDate: Date
    status: "pending" | "completed"
    person: Types.ObjectId
    deal: Types.ObjectId
    organization: Types.ObjectId | string
    owner: Types.ObjectId | string
  }
  interface Update {
    title?: string
    type?: string
    description?: string
    dueDate?: Date
    completedDate?: Date
    status?: "pending" | "completed"
    person?: Types.ObjectId
    deal?: Types.ObjectId
    organization?: Types.ObjectId | string
    owner?: Types.ObjectId | string
  }
  interface Query {
    title?: string
    type?: string
    description?: string
    dueDate?: Date
    completedDate?: Date
    status?: "pending" | "completed"
    person?: Types.ObjectId
    deal?: Types.ObjectId
    organization?: Types.ObjectId | string
    owner?: Types.ObjectId | string
  }
}
