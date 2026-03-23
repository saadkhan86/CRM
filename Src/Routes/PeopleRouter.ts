import express from "express"
import PeopleController from "../Controller/PeopleController"
const PeopleRouter = express.Router()
PeopleRouter.post("/", PeopleController.Create)
PeopleRouter.get("/query", PeopleController.Query)
PeopleRouter.patch("/:id", PeopleController.Update)
PeopleRouter.delete("/:id", PeopleController.Delete)
PeopleRouter.patch(
  "/:id/remove-organization",
  PeopleController.DeleteOrganizationFromPeople,
)
PeopleRouter.patch(
  "/:id/remove-email/:emailId",
  PeopleController.DeleteEmailFromPeople,
)
PeopleRouter.patch(
  "/:id/remove-phone/:phoneId",
  PeopleController.DeletePhoneFromPeople,
)
export default PeopleRouter
