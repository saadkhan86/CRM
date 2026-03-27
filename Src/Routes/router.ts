import express, { Request, Response } from "express"
import PeopleRouter from "./PeopleRouter"
import UserRouter from "./UserRouter"
import OrganizationRouter from "./OrganizationRouter"
import DealsRouter from "./DealsRouter"
import ActivityRouter from "./ActivityRouter"
import NoteRouter from "./NoteRouter"
import PipelineRouter from "./PipelineRouter"
const Router = express.Router()

Router.use("/users", UserRouter)
Router.use("/people", PeopleRouter)
Router.use("/organization", OrganizationRouter)
Router.use("/deals", DealsRouter)
Router.use("/activity", ActivityRouter)
Router.use("/notes", NoteRouter)
Router.use("/pipeline", PipelineRouter)
export default Router
