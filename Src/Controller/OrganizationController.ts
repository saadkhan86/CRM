import { Request, Response } from "express"
import OrganizationRepo from "../Repositories/OrganizationRepo"

const OrganizationController = {
  create: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.create({
      name: req.body.name,
      address: req.body.address,
    })
    res.status(200).json({
      success: true,
      message: "organization created successfully",
      data: organization,
    })
  },
  query: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.query(req.query)
    res.status(200).json({
      success: true,
      message: "organization get successfully",
      data: organization,
    })
  },
  update: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.update({
      _id: req.params.id,
      name: req.body.name,
      address: req.body.address,
    })
    res.status(200).json({
      success: true,
      message: "organization update successfully",
      data: organization,
    })
  },
  delete: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.delete(req.params.id)
    res.status(200).json({
      success: true,
      message: "organization delete successfully",
      data: organization,
    })
  },
}

export default OrganizationController
