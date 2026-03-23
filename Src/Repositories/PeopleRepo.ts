import ErrorHandler from "../ErrorHandler/ErrorHandler"
import { IOrganization } from "../Interfaces/IOrganization"
import { IPeople } from "../Interfaces/IPeople"
import PeopleModel from "../Models/People.Model"
import OrganizationRepo from "./OrganizationRepo"

class PeopleRepo {
  async Create(data: IPeople.Create) {
    let organization: any
    if (data.organization._id) {
      organization = await OrganizationRepo.Query({
        _id: data.organization._id,
      })
    } else {
      organization = await OrganizationRepo.Create({
        name: data.organization.name!,
        address: "",
      })
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
          await OrganizationRepo.AddPeople(people.organization._id)
        }
        return people
      })
  }
  async Query(data: IPeople.Query) {
    const { limit = 5, page = 1 } = data
    const _query: Record<string, any> = {}
    if (data.name) _query.name = { $regex: data.name, $options: "i" }
    if (data.email) _query.email = { $elemMatch: { address: data.email } }
    if (data.phone) _query.phone = { $elemMatch: { number: data.phone } }
    if (data.organization)
      _query.organization = { $regex: data.organization, $options: "i" }
    const people = await PeopleModel.find(_query)
      .skip((page - 1) * limit)
      .limit(limit)
    const count = await PeopleModel.countDocuments(_query)
    return { people, count }
  }
  async Update(id: string, data: IPeople.Update) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    if (data.name) people.name = data.name
    if (data.email.length) {
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
    if (data.phone.length) {
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
    if (data.organization) {
      let organizations: IOrganization.Doc[] = await OrganizationRepo.Query({
        name: data.organization,
      })
      if (!organizations.length) {
        organizations = [
          await OrganizationRepo.Create({
            name: data.organization,
            address: "",
          }),
        ]
      }
      people.organization = organizations[0]._id
    }
    return await people
      .save()
      .then((people) => people.populate("organization", "_id name"))
  }
  async DeleteOrganizationFromPeople(id: string) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    people.organization = null
    return await people.save().then(async (people) => {
      if (people.organization) {
        await OrganizationRepo.RemovePeople(people.organization._id!)
      }
      return people
    })
  }
  async Delete(id: string) {
    const people = await PeopleModel.findByIdAndDelete(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    if (people.organization) {
      await OrganizationRepo.RemovePeople(people.organization._id!)
    }
    return people
  }
  async DeleteEmailFromPeople(id: string, emailId: string) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    ;(people.email as any).pull(emailId)
    return await people.save()
  }
  async DeletePhoneFromPeople(id: string, phoneId: string) {
    const people = await PeopleModel.findById(id)
    if (!people) {
      throw new ErrorHandler(404, "People not found")
    }
    ;(people.phone as any).pull(phoneId)
    return await people.save()
  }
}
export default new PeopleRepo()
