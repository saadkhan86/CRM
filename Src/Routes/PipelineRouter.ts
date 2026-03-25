import express from "express"
import PipelineController from "../Controller/PipelineController"
const PipelineRouter = express.Router()
PipelineRouter.get("/deals", PipelineController.get)
export default PipelineRouter
