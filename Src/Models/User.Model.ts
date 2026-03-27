import mongoose from "mongoose"
import { IUser } from "../Interfaces/IUser"
const UserSchema = new mongoose.Schema<IUser.Doc>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    fid: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
    },
    profile: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "sales"],
      default: "sales",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    manager: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
)
export default mongoose.model<IUser.Doc>("User", UserSchema)
