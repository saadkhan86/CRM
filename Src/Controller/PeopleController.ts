import { Request, Response } from "express"
import PeopleRepo from "../Repositories/PeopleRepo"
const PeopleController = {
  create: async (req: Request, res: Response, next: Function) => {
    const people = await PeopleRepo.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      organization: req.body.organization,
    })
    res.status(201).json({
      success: true,
      message: "People Created Successfully",
      data: people,
    })
  },
  query: async (req: Request, res: Response, next: Function) => {
    const people = await PeopleRepo.query(req.query)
    console.log(people.people[0])
    res.status(200).json({
      success: true,
      message: "People Fetched Successfully",
      data: people,
    })
  },
  update: async (req: Request, res: Response, next: Function) => {
    const people = await PeopleRepo.update(req.params.id, req.body)
    res.status(200).json({
      success: true,
      message: "People Updated Successfully",
      data: people,
    })
  },
  deleteOrganizationFromPeople: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    const people = await PeopleRepo.deleteOrganizationFromPeople(req.params.id)
    res.status(200).json({
      success: true,
      message: "Organization Deleted Successfully",
      data: people,
    })
  },
  delete: async (req: Request, res: Response, next: Function) => {
    const people = await PeopleRepo.delete(req.params.id)
    res.status(200).json({
      success: true,
      message: "People Deleted Successfully",
      data: people,
    })
  },
  deleteEmailFromPeople: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    const people = await PeopleRepo.deleteEmailFromPeople(
      req.params.id,
      req.params.emailId,
    )
    res.status(200).json({
      success: true,
      message: "Email Deleted Successfully",
      data: people,
    })
  },
  deletePhoneFromPeople: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    const people = await PeopleRepo.deletePhoneFromPeople(
      req.params.id,
      req.params.phoneId,
    )
    res.status(200).json({
      success: true,
      message: "Phone Deleted Successfully",
      data: people,
    })
  },
}
export default PeopleController
