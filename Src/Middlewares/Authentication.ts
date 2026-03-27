import { Request, Response, NextFunction } from "express"
import admin from "../Services/FirebaseAdmin.Service"
import UserModel from "../Models/User.Model"
import jwt from "jsonwebtoken"
const Authentication = {
  authorization: async (req: Request, res: Response, next: Function) => {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
      }
      let user
      const token = authHeader.split(" ")[1]
      try {
        // const decodedByFirebase = await admin.auth().verifyIdToken(token)
        // user = await UserModel.findOne({ fid: decodedByFirebase.uid })
        user = await UserModel.findOne({ fid: token })
      } catch (error) {
        try {
          const decodedByJWT: any = jwt.verify(token, process.env.JWT_SECRET!)
          user = await UserModel.findById(decodedByJWT._id)
        } catch (error) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid Or Expired Token" })
        }
      }
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "User Not Found" })
      }
      req.user = user
      next()
    } catch (error) {
      next(error)
    }
  },
}
export default Authentication
