import { title } from "node:process"
import DealsModel from "../Models/Deals.Model"

class PipelineRepo {
  public async get(data: any) {
    const pipeline = await DealsModel.aggregate([
      {
        $lookup: {
          from: "peoples",
          localField: "person",
          foreignField: "_id",
          as: "person",
        },
      },
      { $unwind: { path: "$person", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "organizations",
          localField: "organization",
          foreignField: "_id",
          as: "organization",
        },
      },
      { $unwind: { path: "$organization", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "owners",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          value: 1,
          title: 1,
          stage: 1,
          "person._id": 1,
          "person.name": 1,
          "organization._id": 1,
          "organization.name": 1,
          "owner._id": 1,
          "owner.name": 1,
        },
      },
      {
        $group: {
          _id: "$stage",
          deals: { $push: "$$ROOT" },
          totalDeals: { $sum: 1 },
          totalValue: { $sum: "$value.amount" },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ])
    return pipeline
  }
}
export default new PipelineRepo()
