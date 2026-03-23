import { Request, Response } from "express"
import PeopleRepo from "../Repositories/PeopleRepo"
const PeopleController = {
  Create: async (req: Request, res: Response, next: Function) => {
    try {
      const { name, email, phone, organization } = req.body
      const people = await PeopleRepo.Create({
        name,
        email,
        phone,
        organization,
      })
      res.status(201).json({ success: true, data: people })
    } catch (error) {
      next(error)
    }
  },
  Query: async (req: Request, res: Response, next: Function) => {
    try {
      const people = await PeopleRepo.Query(req.query)
      res.status(200).json({ success: true, data: people })
    } catch (error) {
      next(error)
    }
  },
  Update: async (req: Request, res: Response, next: Function) => {
    try {
      const people = await PeopleRepo.Update(req.params.id, req.body)
      res.status(200).json({ success: true, data: people })
    } catch (error) {
      next(error)
    }
  },
  DeleteOrganizationFromPeople: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const people = await PeopleRepo.DeleteOrganizationFromPeople(
        req.params.id,
      )
      res.status(200).json({ success: true, data: people })
    } catch (error) {
      next(error)
    }
  },
  Delete: async (req: Request, res: Response, next: Function) => {
    try {
      const people = await PeopleRepo.Delete(req.params.id)
      res.status(200).json({ success: true, data: people })
    } catch (error) {
      next(error)
    }
  },
  DeleteEmailFromPeople: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const people = await PeopleRepo.DeleteEmailFromPeople(
        req.params.id,
        req.params.emailId,
      )
      res.status(200).json({ success: true, data: people })
    } catch (error) {
      next(error)
    }
  },
  DeletePhoneFromPeople: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const people = await PeopleRepo.DeletePhoneFromPeople(
        req.params.id,
        req.params.phoneId,
      )
      res.status(200).json({ success: true, data: people })
    } catch (error) {
      next(error)
    }
  },
}
export default PeopleController
