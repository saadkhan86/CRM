import express from "express"
import PeopleController from "../Controller/PeopleController"
import Authentication from "../Middlewares/Auth"
const PeopleRouter = express.Router()
PeopleRouter.use(Authentication.user)
PeopleRouter.post("/", PeopleController.create)
PeopleRouter.get("/query", PeopleController.query)
PeopleRouter.patch("/:id", PeopleController.update)
PeopleRouter.delete("/:id", PeopleController.delete)
PeopleRouter.patch(
  "/:id/remove-organization",
  PeopleController.deleteOrganizationFromPeople,
)
PeopleRouter.patch(
  "/:id/remove-email/:emailId",
  PeopleController.deleteEmailFromPeople,
)
PeopleRouter.patch(
  "/:id/remove-phone/:phoneId",
  PeopleController.deletePhoneFromPeople,
)
export default PeopleRouter
