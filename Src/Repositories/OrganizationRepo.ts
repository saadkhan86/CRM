import { Types } from "mongoose"
import { IOrganization } from "../Interfaces/IOrganization"
import OrganizationModel from "../Models/Organization.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
class OrganizationRepo {
  public async create(data: IOrganization.Create) {
    const organization = await OrganizationModel.create(data)
    return organization
  }
  public async query(data: IOrganization.Query) {
    let _query: Record<string, any> = {}
    if (data.name) {
      _query.name = { $regex: data.name, $options: "i" }
    }
    if (data.address) {
      _query.address = { $regex: data.address, $options: "i" }
    }
    if (data._id) {
      _query._id = new Types.ObjectId(data._id)
    }

    const page = Number(data.page) || 1
    const limit = Number(data.limit) || 10
    const skip = (page - 1) * limit

    const organization = await OrganizationModel.find(_query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    const count = await OrganizationModel.countDocuments(_query)
    return { organization, count }
  }
  public async update(data: IOrganization.Update) {
    const organization = await OrganizationModel.findById(data._id)
    if (!organization) {
      throw new ErrorHandler(404, "Organization not found")
    }
    if (data.address) {
      organization.address = data.address
    }
    if (data.name) {
      organization.name = data.name
    }
    await organization.save()
    return organization
  }
  public async delete(_id: Types.ObjectId | string) {
    if (!_id) {
      throw new ErrorHandler(400, "Organization id is required")
    }
    const organization = await OrganizationModel.findByIdAndDelete(_id)
    return organization
  }
  public async addPeople(organizationId: string | Types.ObjectId) {
    if (!organizationId) {
      throw new ErrorHandler(400, "Organization id is required")
    }
    const organization = await OrganizationModel.findById(organizationId)
    if (!organization) {
      throw new ErrorHandler(404, "Organization not found")
    }
    organization.peopleCount++
    await organization.save()
    return organization
  }
  public async removePeople(organizationId: string | Types.ObjectId) {
    if (!organizationId) {
      throw new ErrorHandler(400, "Organization id is required")
    }
    const organization = await OrganizationModel.findById(organizationId)
    if (!organization) {
      throw new ErrorHandler(404, "Organization not found")
    }
    organization.peopleCount--
    await organization.save()
    return organization
  }
}

export default new OrganizationRepo()
