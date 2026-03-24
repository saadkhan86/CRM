import { Request, Response } from "express"
import UserRepo from "../Repositories/UserRepo"

const UserController = {
  update: async (req: Request, res: Response, next: Function) => {
    const profile = await UserRepo.update(req.user?._id, req.body)
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    })
  },
  query: async (req: Request, res: Response, next: Function) => {
    const user = await UserRepo.query(req.user!._id)
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    })
  },
}

export default UserController
