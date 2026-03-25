import { Types } from "mongoose"
import { IActivity } from "../Interfaces/IActivity"
import ActivityModel from "../Models/Activity.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import DealsModel from "../Models/Deals.Model"
import DealsRepo from "./DealsRepo"
import PeopleRepo from "./PeopleRepo"
import OrganizationRepo from "./OrganizationRepo"

class ActivityRepo {
  public async create(data: IActivity.Create) {
    let personId = data.person
    let organizationId: Types.ObjectId | null | string | undefined =
      data.organization

    if (data.deal) {
      const deal = await DealsRepo.query({ _id: data.deal })
      if (!deal.deals.length) throw new ErrorHandler(404, "Deal Not Found")

      personId = deal.deals[0].person
      organizationId = deal.deals[0].organization
    } else if (data.person) {
      const person = await PeopleRepo.query({ _id: data.person })
      if (person.people.length !== 1)
        throw new ErrorHandler(404, "Person Not Found")

      organizationId = person.people[0].organization
    } else if (data.organization) {
      const organization = await OrganizationRepo.query({
        _id: data.organization,
      })
      if (!organization.organization.length)
        throw new ErrorHandler(404, "Organization Not Found")

      organizationId = organization.organization[0]._id
    }

    if (!data.deal && !data.person && !data.organization)
      throw new ErrorHandler(
        409,
        "Activity must belong to deal, person, or organization",
      )

    let activity = new ActivityModel({
      title: data.title,
      type: data.type,
      description: data.description,
      dueDate: data.dueDate || null,
      completedDate: data.completedDate || null,
      status: data.status || "pending",
      person: personId,
      deal: data.deal,
      owner: data.owner,
      organization: organizationId,
    })
    activity = await activity.save()
    return await activity.populate([
      { path: "person", select: "name" },
      { path: "deal", select: "title" },
      { path: "organization", select: "name" },
      { path: "owner", select: "name" },
    ])
  }
  public async update(
    activityId: Types.ObjectId | string,
    data: IActivity.Update,
  ) {
    let activity = await ActivityModel.findById(activityId)
    if (!activity) {
      throw new ErrorHandler(404, "Activity Not Found")
    }
    if (data.title) activity.title = data.title
    if (data.type) activity.type = data.type
    if (data.description) activity.description = data.description
    if (data.dueDate) activity.dueDate = data.dueDate
    if (data.status) activity.status = data.status
    if (data.person) activity.person = data.person
    if (data.organization) activity.organization = data.organization
    if (data.deal) activity.deal = data.deal
    if (data.owner) activity.owner = data.owner
    activity = await activity.save()
    return await activity.populate([
      { path: "person", select: "name" },
      { path: "deal", select: "title" },
      { path: "organization", select: "name" },
      { path: "owner", select: "name" },
    ])
  }
  public async delete(_id: Types.ObjectId | string) {
    return await ActivityModel.findByIdAndDelete(_id)
  }
  public async query(data: IActivity.Query) {
    let _query: Record<string, any> = {}
    if (data.title) _query.title = data.title
    if (data.type) _query.type = data.type
    if (data.description) _query.description = data.description
    if (data.dueDate) _query.dueDate = data.dueDate
    if (data.status) _query.status = data.status
    if (data.person) _query.person = new Types.ObjectId(data.person)
    if (data.organization)
      _query.organization = new Types.ObjectId(data.organization)
    if (data.deal) _query.deal = new Types.ObjectId(data.deal)
    if (data.owner) _query.owner = new Types.ObjectId(data.owner)

    const page = Number(data.page) || 1
    const limit = Number(data.limit) || 10
    const skip = (page - 1) * limit

    const activity = await ActivityModel.find(_query)
      .populate([
        { path: "person", select: "name" },
        { path: "deal", select: "title" },
        { path: "organization", select: "name" },
        { path: "owner", select: "name" },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    const count = await ActivityModel.countDocuments(_query)
    return { activity, count }
  }
}
export default new ActivityRepo()
