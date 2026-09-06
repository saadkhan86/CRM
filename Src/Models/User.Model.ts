import mongoose from "mongoose"
import { IUser } from "../Interfaces/IUser"
import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema<IUser.Doc>(
  {
    fid: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
    },
    passwordHash: {
      type: String,
      select:false,
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
UserSchema.pre("save",async function(){
  if(!this.isModified("passwordHash")) return
  this.passwordHash = await bcrypt.hash(this.passwordHash,10)
})

UserSchema.methods.comparePassword = async function(password:string){
  return await bcrypt.compare(password,this.passwordHash)
}
export default mongoose.model<IUser.Doc>("User", UserSchema)
