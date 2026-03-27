import { Request, Response } from "express"

const Audit = {
  creationAudit: async (req: Request, res: Response, next: Function) => {
    if (req.method === "POST") {
      if (req.user?.role === "sales") {
        req.body.createdBy = req.user!._id
        req.body.owner = req.user._id
      }
    }
    next()
  },
  updationAudit: async (req: Request, res: Response, next: Function) => {
    if (req.method === "PATCH") {
      req.body.updatedBy = req.user!._id
    }
    next()
  },
}
export default Audit
