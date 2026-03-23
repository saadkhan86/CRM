import { Request, Response } from "express"
import UserRepo from "../Repositories/UserRepo"

const UserController = {
  Update: async (req: Request, res: Response, next: Function) => {
    try {
      const profile = await UserRepo.Update(req.body, req.user!._id)
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: profile,
      })
    } catch (error) {
      next(error)
    }
  },
  Query: async (req: Request, res: Response, next: Function) => {
    try {
      const user = await UserRepo.Query(req.user!._id)
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      })
    } catch (error) {
      next(error)
    }
  },
}

export default UserController
