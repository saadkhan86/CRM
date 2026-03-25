import { Request, Response } from "express"
import DealsRepo from "../Repositories/DealsRepo"
import { IDeal } from "../Interfaces/IDeal"

const DealsController = {
  create: async (req: Request, res: Response, next: Function) => {
    let data: IDeal.Create = req.body
    data.owner = req.user!._id
    const deal = await DealsRepo.create(data)
    res
      .status(200)
      .json({ success: true, message: "Deal Created Successfully", deal })
  },
  update: async (req: Request, res: Response, next: Function) => {
    const deal = await DealsRepo.update(req.params.id, req.body)
    res
      .status(200)
      .json({ success: true, message: "Deal Updated Successfully", deal })
  },
  query: async (req: Request, res: Response, next: Function) => {
    const deals = await DealsRepo.query(req.query as IDeal.Query)
    res.status(200).json({ success: true, deals })
  },
}
export default DealsController
