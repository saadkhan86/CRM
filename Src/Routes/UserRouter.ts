import express from "express"
import UserController from "../Controller/UserController"
import Authentication from "../Middlewares/Auth"
const UserRouter = express.Router()
UserRouter.patch("/profile", Authentication.user, UserController.Update)
UserRouter.get("/profile", Authentication.user, UserController.Query)
export default UserRouter
