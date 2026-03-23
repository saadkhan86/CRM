import express from "express"
import PeopleRouter from "./PeopleRouter"
import UserRouter from "./UserRouter"
import OrganizationRouter from "./OrganizationRouter"
const Router = express.Router()

Router.use("/user", UserRouter)
Router.use("/people", PeopleRouter)
Router.use("/organization", OrganizationRouter)
export default Router
