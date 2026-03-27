import { title } from "node:process"
import DealsModel from "../Models/Deals.Model"
import UserModel from "../Models/User.Model"
import { pipeline } from "node:stream"
import { Types } from "mongoose"

class PipelineRepo {
  public async getDeals(data: any) {
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
  public async getUsers(user: any) {
    let pipeline
    if (user.role == "admin") {
      pipeline = await UserModel.aggregate([
        {
          $match: {
            role: "manager",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "manager",
            as: "team",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            team: {
              $map: {
                input: "$team",
                as: "member",
                in: {
                  _id: "$$member._id",
                  name: "$$member.name",
                  email: "$$member.email",
                  role: "$$member.role",
                  status: "$$member.status",
                },
              },
            },
          },
        },
      ])
    } else if (user.role == "manager") {
      pipeline = await UserModel.aggregate([
        {
          $match: {
            role: "sales",
            manager: new Types.ObjectId(user._id),
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            status: 1,
          },
        },
      ])
    }
    return pipeline
  }
}
export default new PipelineRepo()
