import { Request, Response } from "express"
import OrganizationRepo from "../Repositories/OrganizationRepo"

const OrganizationController = {
  Create: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.Create({
      name: req.body.name,
      address: req.body.address,
    })
    res.status(200).json({
      success: true,
      message: "organization created successfully",
      data: organization,
    })
  },
  Query: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.Query(req.query)
    res.status(200).json({
      success: true,
      message: "organization get successfully",
      data: organization,
    })
  },
  Update: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.Update({
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
  Delete: async (req: Request, res: Response, next: Function) => {
    const organization = await OrganizationRepo.Delete({
      _id: req.params.id,
    })
    res.status(200).json({
      success: true,
      message: "organization delete successfully",
      data: organization,
    })
  },
}

export default OrganizationController
