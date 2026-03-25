import mongoose from "mongoose"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import { IOrganization } from "../Interfaces/IOrganization"
import { IPeople } from "../Interfaces/IPeople"
import PeopleModel from "../Models/People.Model"
import OrganizationRepo from "./OrganizationRepo"

class PeopleRepo {
  async create(data: IPeople.Create) {
    let organization: IOrganization.Doc
    if (data.organization._id) {
      const result = await OrganizationRepo.query({
        _id: data.organization._id,
      })
      if (!result.organization.length) {
        throw new ErrorHandler(404, "Organization not found")
      }
      organization = result.organization[0]
    } else if (data.organization.name) {
      const result = await OrganizationRepo.query({
        name: data.organization.name,
      })
      if (!result.organization.length) {
        organization = await OrganizationRepo.create({
          name: data.organization.name,
          address: "",
          owner: data.owner,
        })
      } else {
        organization = result.organization[0]
      }
    } else {
      throw new ErrorHandler(400, "Organization ID or name is required")
    }
    const people = new PeopleModel({
      name: data.name,
      email: data.email?.map((email) => ({
        address: email.address,
        label: email.label,
      })),
      phone: data.phone?.map((phone) => ({
        number: phone.number,
        label: phone.label,
      })),
      organization: organization._id,
    })
    return await people
      .save()
      .then((people) => people.populate("organization", "_id name"))
      .then(async (people) => {
        if (people.organization) {
          await OrganizationRepo.addPeople(people.organization._id)
        }
        return people
      })
  }
  async query(data: IPeople.Query) {
    const page = Number(data.page) || 1
    const limit = Number(data.limit) || 10
    const _query: Record<string, any> = {}
    if (data._id) _query._id = new mongoose.Types.ObjectId(data._id)
    if (data.name) _query.name = { $regex: data.name, $options: "i" }
    if (data.email) _query.email = { $elemMatch: { address: data.email } }
    if (data.phone) _query.phone = { $elemMatch: { number: data.phone } }
    if (data.organization)
      _query.organization = new mongoose.Types.ObjectId(data.organization)
    if (data.owner) _query.owner = new mongoose.Types.ObjectId(data.owner)
    const people = await PeopleModel.find(_query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    const count = await PeopleModel.countDocuments(_query)
    return { people, count }
  }
  async update(id: string, data: IPeople.Update) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    if (data.name) people.name = data.name
    if (data.email?.length) {
      for (let i = 0; i < data.email.length; i++) {
        const isExist = people.email.some(
          (email) => email.address === data.email[i].address,
        )
        if (!isExist) {
          people.email.push({
            address: data.email[i].address,
            label: data.email[i].label,
          })
        }
      }
    }
    if (data.phone?.length) {
      for (let i = 0; i < data.phone.length; i++) {
        const isExist = people.phone.some(
          (phone) => phone.number === data.phone[i].number,
        )
        if (!isExist) {
          people.phone.push({
            number: data.phone[i].number,
            label: data.phone[i].label,
          })
        }
      }
    }
    let organization: IOrganization.Doc
    if (data.organization._id) {
      const result = await OrganizationRepo.query({
        _id: data.organization._id,
      })
      if (!result.organization.length) {
        throw new ErrorHandler(404, "Organization not found")
      }
      organization = result.organization[0]
    } else if (data.organization.name) {
      const result = await OrganizationRepo.query({
        name: data.organization.name,
      })
      if (!result.organization.length) {
        organization = await OrganizationRepo.create({
          name: data.organization.name,
          address: "",
          owner: data.owner,
        })
      } else {
        organization = result.organization[0]
      }
    } else {
      throw new ErrorHandler(400, "Organization ID or name is required")
    }
    people.organization = organization._id as any
    return await people
      .save()
      .then((people) => people.populate("organization", "_id name"))
      .then(async (people) => {
        if (people.organization) {
          await OrganizationRepo.addPeople(people.organization._id!)
        }
        return people
      })
  }
  async deleteOrganizationFromPeople(id: string) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    people.organization = null
    return await people.save().then(async (people) => {
      if (people.organization) {
        await OrganizationRepo.removePeople(people.organization._id!)
      }
      return people
    })
  }
  async delete(id: string) {
    const people = await PeopleModel.findByIdAndDelete(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    if (people.organization) {
      await OrganizationRepo.removePeople(people.organization._id!)
    }
    return people
  }
  async deleteEmailFromPeople(id: string, emailId: string) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    ;(people.email as any).pull(emailId)
    return await people.save()
  }
  async deletePhoneFromPeople(id: string, phoneId: string) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    ;(people.phone as any).pull(phoneId)
    return await people.save()
  }
}
export default new PeopleRepo()
