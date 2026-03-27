import { Request, Response } from "express"
import UserRepo from "../Repositories/UserRepo"

const UserController = {
  create: async (req: Request, res: Response, next: Function) => {
    const user = await UserRepo.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile: req.body.profile,
      role: req.body.role,
      createdBy: req.user!._id,
      status: req.body.status,
      manager: req.body.manager,
    })
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    })
  },
  login: async (req: Request, res: Response, next: Function) => {
    const user = await UserRepo.login({
      email: req.body.email,
      password: req.body.password,
    })
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    })
  },
  update: async (req: Request, res: Response, next: Function) => {
    const profile = await UserRepo.update(req.user!._id, {
      ...req.body,
      createdBy: req.user!._id,
      updatedBy: req.user!._id,
    })
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
