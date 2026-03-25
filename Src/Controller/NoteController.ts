import { Request, Response } from "express"
import NoteRepo from "../Repositories/NoteRepo"
import { INote } from "../Interfaces/INote"

const NoteController = {
  create: async (req: Request, res: Response, next: Function) => {
    let data = req.body
    data.owner = req.user?._id
    const note = await NoteRepo.create(data)
    res
      .status(200)
      .json({ success: true, message: "Note Created Successfully", note })
  },
  update: async (req: Request, res: Response, next: Function) => {
    let data: INote.Update = req.body
    data.owner = req.user?._id
    const note = await NoteRepo.update(req.params.id, data)
    res
      .status(200)
      .json({ success: true, message: "Note Updated Successfully", note })
  },
  query: async (req: Request, res: Response, next: Function) => {
    const note = await NoteRepo.query(req.query)
    res
      .status(200)
      .json({ success: true, message: "Note Fetched Successfully", note })
  },
  delete: async (req: Request, res: Response, next: Function) => {
    const note = await NoteRepo.delete(req.params.id)
    res
      .status(200)
      .json({ success: true, message: "Note Deleted Successfully", note })
  },
}
export default NoteController
