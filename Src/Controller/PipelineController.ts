import { Request, Response } from "express"
import PipelineRepo from "../Repositories/PipelineRepo"

const PipelineController = {
  getDeals: async (req: Request, res: Response, next: Function) => {
    const pipeline = await PipelineRepo.getDeals(req.query)
    res.status(200).json({
      success: true,
      message: "Deals Retrieved Successfully",
      pipeline,
    })
  },
  getUsers: async (req: Request, res: Response, next: Function) => {
    const pipeline = await PipelineRepo.getUsers(req.user)
    res.status(200).json({
      success: true,
      message: "Users Retrieved Successfully",
      pipeline,
    })
  },
}
export default PipelineController
