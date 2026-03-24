import express from "express"
import UserController from "../Controller/UserController"
import Authentication from "../Middlewares/Auth"
const UserRouter = express.Router()
UserRouter.use(Authentication.user)
UserRouter.patch("/profile", UserController.update)
UserRouter.get("/profile", UserController.query)
export default UserRouter
