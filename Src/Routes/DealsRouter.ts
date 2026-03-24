import express from "express"
import DealsController from "../Controller/DealsController"
const DealsRouter = express.Router()
DealsRouter.post("/", DealsController.Create)
DealsRouter.patch("/:id", DealsController.Update)
DealsRouter.get("/query", DealsController.Query)
export default DealsRouter
