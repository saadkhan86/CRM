import { Request, Response } from "express"
import DealsModel from "../Models/Deals.Model"

const OwnerShip = async (req: Request, res: Response, next: Function) => {
  const deal = await DealsModel.findById(req.params.id)
  if (!deal) {
    res.status(404).json({ success: false, message: "Deal Not Found" })
  }
  if (req.user?.role === "admin") {
    return next()
  }
  if (req.user?._id.toString() !== deal?.owner.toString()) {
    res.status(403).json({ success: false, message: "Access Denied" })
  }
  next()
}
export default OwnerShip
