import { Types } from "mongoose"
import { IOrganization } from "../Interfaces/IOrganization"
import OrganizationModel from "../Models/Organization.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
class OrganizationRepo {
  public async Create(data: IOrganization.Create) {
    const organization = await OrganizationModel.create(data)
    return organization
  }
  public async Query(data: IOrganization.Query) {
    console.log(data)
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
    const organization = await OrganizationModel.find(_query)
    return organization
  }
  public async Update(data: IOrganization.Update) {
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
  public async Delete(data: IOrganization.Delete) {
    if (!data._id) {
      throw new ErrorHandler(400, "Organization id is required")
    }
    const organization = await OrganizationModel.findByIdAndDelete(data._id)
    if (!organization) {
      throw new ErrorHandler(404, "Organization not found")
    }
    return organization
  }
  public async AddPeople(organizationId: string | Types.ObjectId) {
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
  public async RemovePeople(organizationId: string | Types.ObjectId) {
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
