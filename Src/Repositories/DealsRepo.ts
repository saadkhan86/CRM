import { Types } from "mongoose"
import { IDeal } from "../Interfaces/IDeal"
import DealsModel from "../Models/Deals.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"

class DealsRepo {
  public async create(data: IDeal.Create) {
    const deal = await DealsModel.create({
      title: data.title,
      value: {
        amount: data.value.amount,
        currency: data.value.currency,
      },
      stage: data.stage,
      person: data.person,
      organization: data.organization,
      owner: data.owner,
    })
    return deal
  }
  public async update(dealId: Types.ObjectId | string, data: IDeal.Update) {
    let deal: IDeal.Doc | null = await DealsModel.findById(dealId)
    if (!deal) throw new ErrorHandler(404, "Deal not found")
    if (data.title) deal.title = data.title
    if (data.value) {
      deal.value.amount = data.value.amount
      deal.value.currency = data.value.currency
    }
    if (data.stage) deal.stage = data.stage
    if (data.person) deal.person = data.person
    if (data.organization) deal.organization = data.organization
    if (data.owner) deal.owner = data.owner
    await deal.save()
    return deal
  }
  public async query(data: IDeal.Query) {
    let _query: Record<string, any> = {}
    if (data._id) _query._id = data._id
    if (data.owner) _query.owner = data.owner
    if (data.organization) _query.organization = data.organization
    if (data.person) _query.person = data.person
    if (data.stage) _query.stage = data.stage
    if (data.title) _query.title = data.title
    const deals = await DealsModel.find(_query)
      .populate("organization")
      .populate("owner")
      .populate("person")
    const count = await DealsModel.countDocuments(_query)
    return { deals, count }
  }
}
export default new DealsRepo()
