import { Request, Response } from "express"
import DealsRepo from "../Repositories/DealsRepo"
import { IDeal } from "../Interfaces/IDeal"

const DealsController = {
  Create: async (req: Request, res: Response, next: Function) => {
    try {
      let data: IDeal.Create = req.body
      data.owner = req.user?._id
      const deal = await DealsRepo.Create(data)
      res
        .status(200)
        .json({ success: true, message: "Deal Created Successfully", deal })
    } catch (error) {
      next(error)
    }
  },
  Update: async (req: Request, res: Response, next: Function) => {
    try {
      const deal = await DealsRepo.Update(req.params.id, req.body)
      res
        .status(200)
        .json({ success: true, message: "Deal Updated Successfully", deal })
    } catch (error) {
      next(error)
    }
  },
  Query: async (req: Request, res: Response, next: Function) => {
    try {
      const deals = await DealsRepo.Query(req.query as IDeal.Query)
      res.status(200).json({ success: true, deals })
    } catch (error) {
      next(error)
    }
  },
}
export default DealsController
