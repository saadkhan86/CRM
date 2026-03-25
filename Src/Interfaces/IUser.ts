import { Document } from "mongoose"
export declare namespace IUser {
  interface Doc extends Document {
    email: string
    name: string
    profile: string
    password?: string
  }
  interface Create {
    email: string
    name: string
    profile: string
    password?: string
  }
  interface Update {
    name?: string
    email?: string
    profile?: string
  }
}
