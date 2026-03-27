import express from "express"
import DealsController from "../Controller/DealsController"
import Authentication from "../Middlewares/Authentication"
const DealsRouter = express.Router()
DealsRouter.use(Authentication.authorization)
DealsRouter.post("/", DealsController.create)
DealsRouter.patch("/:id", DealsController.update)
DealsRouter.get("/query", DealsController.query)
export default DealsRouter
