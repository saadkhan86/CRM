import mongoose from "mongoose"
import env from "dotenv"
import { DEFAULT_CIPHERS } from "node:tls"
import { error } from "node:console"
env.config()
const DB: any = process.env.MONGODB_URI
const connetion = async () => {
  return await mongoose.connect(DB).then(() => {
    console.log("mongo db connected")
  })
  throw error(error)
}
export default connetion
