import express from "express"
import ActivityController from "../Controller/ActivityController"
import Authentication from "../Middlewares/Authentication"
const ActivityRouter = express.Router()
ActivityRouter.use(Authentication.authorization)
ActivityRouter.post("/", ActivityController.create)
ActivityRouter.patch("/:id", ActivityController.update)
ActivityRouter.delete("/:id", ActivityController.delete)
ActivityRouter.get("/query", ActivityController.query)
export default ActivityRouter
