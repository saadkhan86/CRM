import { Types } from "mongoose"
import { IUser } from "../Interfaces/IUser"
import UserModel from "../Models/User.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"

class UserRepo {
  public async update(userId: Types.ObjectId | string, data: IUser.Update) {
    let user = await UserModel.findById({ _id: userId })
    if (!user) {
      throw new ErrorHandler(404, "User not found")
    }
    if (data.name) user.name = data.name
    if (data.email) user.email = data.email
    if (data.profile) user.profile = data.profile
    await user.save()
    return user
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
