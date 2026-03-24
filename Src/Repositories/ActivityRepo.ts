import { Types } from "mongoose"
import { IActivity } from "../Interfaces/IActivity"
import ActivityModel from "../Models/Activity.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import DealsModel from "../Models/Deals.Model"

class ActivityRepo {
  public async create(data: IActivity.Create) {
    const activity = await ActivityModel.create({
      title: data.title,
      type: data.type,
      description: data.description,
      dueDate: data.dueDate || null,
      completedDate: data.completedDate || null,
      status: data.status || "pending",
      person: data.person,
      deal: data.deal,
      owner: data.owner,
      organization: data.organization,
    })
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
    return await activity.save()
  }
  public async delete(_id: Types.ObjectId | string) {
    return await DealsModel.findByIdAndDelete(_id)
  }
  public async query(data: IActivity.Query) {
    let _query: Record<string, any> = {}
    if (data.title) _query.title = data.title
    if (data.type) _query.type = data.type
    if (data.description) _query.description = data.description
    if (data.dueDate) _query.dueDate = data.dueDate
    if (data.status) _query.status = data.status
    if (data.person) _query.person = data.person
    if (data.organization) _query.organization = data.organization
    if (data.deal) _query.deal = data.deal
    if (data.owner) _query.owner = data.owner
    const activity = await ActivityModel.find(_query)
    const count = await ActivityModel.countDocuments(_query)
    return { activity, count }
  }
}
export default new ActivityRepo()
