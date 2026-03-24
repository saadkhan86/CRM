import express from "express"
import OrganizationController from "../Controller/OrganizationController"
import Authentication from "../Middlewares/Auth"
const OrganizationRouter = express.Router()
OrganizationRouter.use(Authentication.user)
OrganizationRouter.post("/", OrganizationController.create)

OrganizationRouter.get("/query", OrganizationController.query)

OrganizationRouter.patch("/:id", OrganizationController.update)

OrganizationRouter.delete("/:id", OrganizationController.delete)

export default OrganizationRouter
