import { Request, Response } from "express"
import ActivityRepo from "../Repositories/ActivityRepo"
import { IActivity } from "../Interfaces/IActivity"

const ActivityController = {
  create: async (req: Request, res: Response, next: Function) => {
    let data = req.body
    data.owner = req.user!._id
    const activity = await ActivityRepo.create(data)
    res.status(200).json({
      success: true,
      message: "Activity Created Successfully",
      activity,
    })
  },
  update: async (req: Request, res: Response, next: Function) => {
    let data: IActivity.Update = req.body
    data.owner = req.user?._id
    const activity = await ActivityRepo.update(req.params.id, data)
    res.status(200).json({
      success: true,
      message: "Activity Updated Successfully",
      activity,
    })
  },
  delete: async (req: Request, res: Response, next: Function) => {
    const activity = await ActivityRepo.delete(req.params.id)
    res.status(200).json({
      success: true,
      message: "Activity Deleted Successfully",
      activity,
    })
  },
  query: async (req: Request, res: Response, next: Function) => {
    const activity = await ActivityRepo.query(req.query)
    res.status(200).json({
      success: true,
      mesage: "Activities Fetched Successfully",
      activity,
    })
  },
}
export default ActivityController
