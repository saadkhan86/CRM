import { Document, Types } from "mongoose"
export declare namespace IUser {
  interface Doc extends Document {
    email: string
    name: string
    fid: string
    password: string
    profile: string
    role: "admin" | "manager" | "sales"
    createdBy: Types.ObjectId | string
    updatedBy: Types.ObjectId | string
    manager: Types.ObjectId | string | null
    status: "active" | "inactive"
  }
  interface Create {
    email: string
    name: string
    password: string
    profile: string
    role: "admin" | "manager" | "sales"
    createdBy: Types.ObjectId | string
    status: "active" | "inactive"
    manager?: Types.ObjectId | string | null
  }
  interface Update {
    name?: string
    email?: string
    password?: string
    profile?: string
    role?: "admin" | "manager" | "sales"
    createdBy?: Types.ObjectId | string
    updatedBy: Types.ObjectId | string
    status?: "active" | "inactive"
    manager?: Types.ObjectId | string
  }
  interface Query {
    email?: string
    name?: string
    profile?: string
    role?: "admin" | "manager" | "sales"
    createdBy?: Types.ObjectId | string
    updatedBy?: Types.ObjectId | string
    status?: "active" | "inactive"
    manager?: Types.ObjectId | string
  }
}
