import { Request, Response } from "express"
import admin from "../Services/FirebaseAdmin.Service"
import UserModel from "../Models/User.Model"

const Authentication = {
  user: async (req: Request, res: Response, next: Function) => {
    try {
      // if (req.headers && req.headers.authorization?.startsWith("Bearer ")) {
      //   const token = req.headers.authorization.split(" ")[1]
      //   if (!token) {
      //     return res.status(401).json({ message: "Unauthorized" })
      //   }
      //   const decodedToken = await admin.auth().verifyIdToken(token)
      //   if (!decodedToken) {
      //     return res.status(401).json({ message: "Unauthorized" })
      //   }
      //   const { email, name, picture } = decodedToken
      let isExist = await UserModel.findOne({ email: "sk8613013@gmail.com" })
      if (!isExist) {
        isExist = await UserModel.create({
          email: "sk8613013@gmail.com",
          name: "saad",
          profile: "",
        })
      }
      req.user = isExist
      next()
      // }
    } catch (error) {
      next(error)
    }
  },
}
export default Authentication
