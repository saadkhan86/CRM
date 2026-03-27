import express from "express"
import OrganizationController from "../Controller/OrganizationController"
import Authentication from "../Middlewares/Authentication"
import Audit from "../Middlewares/Audit"
import CreatorRoles from "../Middlewares/CreatorRoles"
const OrganizationRouter = express.Router()
OrganizationRouter.use(Authentication.authorization)
OrganizationRouter.post(
  "/",
  Audit.creationAudit,
  CreatorRoles.allow("admin", "manager", "sales"),
  OrganizationController.create,
)

OrganizationRouter.get(
  "/query",
  Authentication.authorization,
  OrganizationController.query,
)

OrganizationRouter.patch("/:id", OrganizationController.update)

OrganizationRouter.delete("/:id", OrganizationController.delete)

export default OrganizationRouter
