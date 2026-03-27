import express from "express"
import PipelineController from "../Controller/PipelineController"
import Authentication from "../Middlewares/Authentication"
const PipelineRouter = express.Router()
PipelineRouter.get("/deals", PipelineController.getDeals)
PipelineRouter.get(
  "/users",
  Authentication.authorization,
  PipelineController.getUsers,
)
export default PipelineRouter
