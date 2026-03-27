import { Request, Response } from "express"

const CreatorRoles = {
  allow: (...roles: string[]) => {
    return (req: Request, res: Response, next: Function) => {
      const user = req.user
      if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
      }
      if (!roles.includes(user.role)) {
        return res
          .status(403)
          .json({ success: false, message: "You don't have permission" })
      }
      next()
    }
  },
}
export default CreatorRoles
