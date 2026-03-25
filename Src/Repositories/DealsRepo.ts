import { Types } from "mongoose"
import { IDeal } from "../Interfaces/IDeal"
import DealsModel from "../Models/Deals.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import PeopleRepo from "./PeopleRepo"

class DealsRepo {
  public async create(data: IDeal.Create) {
    let person: any = null
    let organizationId = data.organization
    if (data.person) {
      person = await PeopleRepo.query({ _id: data.person })
      if (!person || person.people.length !== 1) {
        throw new ErrorHandler(404, "Person Not Found")
      }
      person = person.people[0]
      if (!organizationId && person.organization) {
        organizationId = person.organization
      }
      if (
        organizationId &&
        person.organization &&
        organizationId.toString() !== person.organization.toString()
      ) {
        throw new ErrorHandler(
          409,
          "person does not belongs to this organization",
        )
      }
    }
    let deal = new DealsModel({
      title: data.title,
      value: {
        amount: data.value.amount,
        currency: data.value.currency,
      },
      stage: data.stage,
      person: person._id,
      organization: organizationId,
      owner: data.owner,
    })
    await deal.save()
    return await deal.populate([
      { path: "person", select: "name" },
      { path: "organization", select: "name" },
      { path: "owner", select: "name" },
    ])
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
    console.log(data.owner)
    if (data._id) _query._id = data._id
    if (data.owner) _query.owner = new Types.ObjectId(data.owner)
    if (data.organization)
      _query.organization = new Types.ObjectId(data.organization)
    if (data.person) _query.person = new Types.ObjectId(data.person)
    if (data.stage) _query.stage = data.stage
    if (data.title) _query.title = data.title

    const page = Number(data.page) || 1
    const limit = Number(data.limit) || 10
    const skip = (page - 1) * limit

    const deals = await DealsModel.find(_query)
      .populate({ path: "organization", select: "name" })
      .populate({ path: "owner", select: "name" })
      .populate({ path: "person", select: "name" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    const count = await DealsModel.countDocuments(_query)
    return { deals, count }
  }
}
export default new DealsRepo()
