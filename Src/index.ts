import GlobalErrorHandler from "./ErrorHandler/GlobalErrorHandler"
import express, { Request, Response } from "express"
import Router from "./Routes/router"
import dotenv from "dotenv"
import cors from "cors"
import connetion from "./Connetions/MongoDB"
dotenv.config()
const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" }))
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server is running properly" })
})
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})
app.use("/api/v1", Router)

app.use(GlobalErrorHandler)

connetion().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening on port", process.env.PORT || 3000)
  })
})

