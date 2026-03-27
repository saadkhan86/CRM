import express from "express"
import UserController from "../Controller/UserController"
import Authentication from "../Middlewares/Authentication"
import Role from "../Middlewares/Role"
import Audit from "../Middlewares/Audit"
const UserRouter = express.Router()
UserRouter.post("/login", UserController.login)
UserRouter.post(
  "/",
  Authentication.authorization,
  Role.validateRoleForCreation,
  Audit.creationAudit,
  UserController.create,
)
UserRouter.patch(
  "/profile",
  Authentication.authorization,
  UserController.update,
)
UserRouter.get("/profile", Authentication.authorization, UserController.query)
export default UserRouter
