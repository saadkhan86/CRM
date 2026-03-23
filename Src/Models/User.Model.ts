import mongoose from "mongoose"
import { IUser } from "../Interfaces/IUser"
const UserSchema = new mongoose.Schema<IUser.Doc>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
    },
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true },
)
export default mongoose.model<IUser.Doc>("User", UserSchema)
