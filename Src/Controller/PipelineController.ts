import { Request, Response } from "express"
import PipelineRepo from "../Repositories/PipelineRepo"

const PipelineController = {
  get: async (req: Request, res: Response, next: Function) => {
    const pipeline = await PipelineRepo.get(req.query)
    res.status(200).json({
      success: true,
      message: "Deals Retrieved Successfully",
      pipeline,
    })
  },
}
export default PipelineController
