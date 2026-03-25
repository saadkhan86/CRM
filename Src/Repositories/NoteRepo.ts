import { INote } from "../Interfaces/INote"
import NoteModel from "../Models/Note.Model"
import { Types } from "mongoose"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import DealsRepo from "./DealsRepo"
import PeopleRepo from "./PeopleRepo"
import OrganizationRepo from "./OrganizationRepo"

class NoteRepo {
  public async create(data: INote.Create) {
    let dealId = data.deal
    let personId = data.person
    let organizationId = data.organization
    if (dealId) {
      let deal = await DealsRepo.query({ _id: dealId })
      if (deal.deals.length !== 1) {
        throw new ErrorHandler(404, "Deal Not Found")
      }
      personId = deal.deals[0].person ?? null
      organizationId = deal.deals[0].organization ?? null
    } else if (personId) {
      let person = await PeopleRepo.query({ _id: personId })
      if (person.people.length !== 1) {
        throw new ErrorHandler(404, "Person Not Found")
      }
      organizationId = person.people[0].organization ?? null
    } else if (organizationId) {
      let organization = await OrganizationRepo.query({ _id: organizationId })
      if (organization.organization.length !== 1) {
        throw new ErrorHandler(404, "Organization Not Found")
      }
    } else {
      throw new ErrorHandler(
        409,
        "Note must belong to deal, person, or organization",
      )
    }
    let note = await NoteModel.create({
      content: data.content,
      person: personId,
      organization: organizationId,
      deal: dealId,
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
    note = await note.save()
    return await note.populate([
      { path: "person", select: "name" },
      { path: "organization", select: "name" },
      { path: "deal", select: "title" },
      { path: "owner", select: "name" },
    ])
  }
  public async query(data: INote.Query) {
    let _query: Record<string, any> = {}
    if (data.deal) _query.deal = data.deal
    if (data.organization) _query.organization = data.organization
    if (data.owner) _query.owner = data.owner
    if (data.person) _query.person = data.person

    const page = Number(data.page) || 1
    const limit = Number(data.limit) || 10
    const skip = (page - 1) * limit
    const notes = await NoteModel.find(_query)
      .populate([
        { path: "person", select: "name" },
        { path: "organization", select: "name" },
        { path: "deal", select: "title" },
        { path: "owner", select: "name" },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    const count = await NoteModel.countDocuments(_query)
    return { notes, count }
  }
  public async delete(noteId: Types.ObjectId | string) {
    return await NoteModel.findByIdAndDelete(noteId)
  }
}
export default new NoteRepo()
