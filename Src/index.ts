import GlobalErrorHandler from "./ErrorHandler/GlobalErrorHandler"
import express, { Request, Response } from "express"
import Router from "./Routes/Router"
import dotenv from "dotenv"
import cors from "cors"
import connetion from "./Connetions/MongoDB"
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.use("/api/v1", Router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("server is running")
})

app.use(GlobalErrorHandler)

connetion()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("server is listening on port", process.env.PORT || 3000)
    })
  })
  .catch((error) => {
    console.log(error)
  })
