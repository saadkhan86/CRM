import { Date, Document, Types } from "mongoose"

export declare namespace IActivity {
  interface Doc extends Document {
    title: string
    type: string
    description: string
    dueDate: Date
    completedDate: Date
    status: "pending" | "completed"
    person: Types.ObjectId | string | null
    deal: Types.ObjectId | string | null
    organization: Types.ObjectId | string | null
    owner: Types.ObjectId | string
  }
  interface Create {
    title: string
    type: string
    description: string
    dueDate: Date
    completedDate: Date
    status: "pending" | "completed"
    person?: Types.ObjectId | string
    deal?: Types.ObjectId | string
    organization?: Types.ObjectId | string
    owner: Types.ObjectId | string
  }
  interface Update {
    title?: string
    type?: string
    description?: string
    dueDate?: Date
    completedDate?: Date
    status?: "pending" | "completed"
    person?: Types.ObjectId | string
    deal?: Types.ObjectId | string
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
    person?: Types.ObjectId | string
    deal?: Types.ObjectId | string
    organization?: Types.ObjectId | string
    owner?: Types.ObjectId | string
  }
}
