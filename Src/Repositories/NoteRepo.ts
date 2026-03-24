import path from "node:path"
import { INote } from "../Interfaces/INote"
import NoteModel from "../Models/Note.Model"
import { Types } from "mongoose"
import ErrorHandler from "../ErrorHandler/ErrorHandler"

class NoteRepo {
  public async create(data: INote.Create) {
    let note: any = NoteModel.create({
      content: data.content,
      person: data.person,
      organization: data.organization,
      deal: data.deal,
      owner: data.owner,
    })
    note = await note.populate([
      { path: "person", select: "name" },
      { path: "organization", select: "name" },
      { path: "deal", select: "title" },
      { path: "owner", select: "name" },
    ])
    return note
  }
  public async update(noteId: Types.ObjectId | string, data: INote.Update) {
    let note = await NoteModel.findById(noteId)
    if (!note) throw new ErrorHandler(404, "Note Not Found")
    if (data.content) note.content = data.content
    if (data.deal) note.deal = data.deal
    if (data.organization) note.organization = data.organization
    if (data.owner) note.owner = data.owner
    if (data.person) note.person = data.person
    return await note.save().then((note) => {
      note.populate([
        { path: "person", select: "name" },
        { path: "organization", select: "name" },
        { path: "deal", select: "title" },
        { path: "owner", select: "name" },
      ])
    })
  }
  public async query(data: INote.Query) {
    let _query: Record<string, any> = {}
    if (data.deal) _query.deal = data.deal
    if (data.organization) _query.organization = data.organization
    if (data.owner) _query.organization = data.organization
    if (data.person) _query.person = data.person
    const notes = await NoteModel.find(_query).populate([
      { path: "person", select: "name" },
      { path: "organization", select: "name" },
      { path: "deal", select: "title" },
      { path: "owner", select: "name" },
    ])
    const count = await NoteModel.countDocuments(_query)
    return { notes, count }
  }
  public async delete(noteId: Types.ObjectId | string) {
    return await NoteModel.findByIdAndDelete(noteId)
  }
}
export default new NoteRepo()
