import express from "express"
import OrganizationController from "../Controller/OrganizationController"
const OrganizationRouter = express.Router()

OrganizationRouter.post("/", OrganizationController.Create)

OrganizationRouter.get("/query", OrganizationController.Query)

OrganizationRouter.patch("/:id", OrganizationController.Update)

OrganizationRouter.delete("/:id", OrganizationController.Delete)

export default OrganizationRouter
