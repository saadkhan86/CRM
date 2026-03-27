import { Types } from "mongoose"
import { IUser } from "../Interfaces/IUser"
import UserModel from "../Models/User.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
class UserRepo {
  public async login(data: { email: string; password: string }) {
    let user = await UserModel.findOne({
      email: data.email,
    })
    if (!user) {
      throw new ErrorHandler(404, "User Not Found")
    }
    const comparePassword = await bcrypt.compare(data.password, user.password)
    if (!comparePassword) throw new ErrorHandler(403, "Wrong Password")
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!)
    return { user, token }
  }
  public async create(data: IUser.Create) {
    data.password = await bcrypt.hash(data.password, 10)
    let user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
      profile: data.profile,
      role: data.role || "sales",
      createdBy: data.createdBy,
      status: data.status || "active",
      manager: data.manager || null,
    })
    return user
  }
  public async update(userId: Types.ObjectId | string, data: IUser.Update) {
    let user = await UserModel.findOne({
      _id: userId,
    })
    if (!user) {
      throw new ErrorHandler(404, "User Not Found")
    }
    user.updatedBy = data.updatedBy
    if (data.role) user.role = data.role
    if (data.name) user.name = data.name
    if (data.email) user.email = data.email
    if (data.profile) user.profile = data.profile
    await user.save()
    return await user.populate("createdBy", "name role")
  }

  public async query(userId: Types.ObjectId | string) {
    let user = await UserModel.findById({ _id: userId })
    if (!user) {
      throw new ErrorHandler(404, "User not found")
    }
    return user
  }
}

export default new UserRepo()
