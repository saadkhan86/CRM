import { Request, Response } from "express"

const Role = {
  validateRoleForCreation: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    if (req.user?.role === "manager") {
      if (req.body.role !== "sales") {
        return res.status(403).json({
          success: false,
          message: "Manager Can Create Saler User Only",
        })
      }
      req.body.manager = req.user?._id
    } else if (req.user?.role === "admin") {
      req.body.manager = null
    } else {
      return res.status(403).json({
        success: false,
        message: "You Are Not Authorized To Create User",
      })
    }
    next()
  },
}
export default Role
