import GlobalErrorHandler from "./ErrorHandler/GlobalErrorHandler"
import express, { Request, Response } from "express"
import Router from "./Routes/Router"
import dotenv from "dotenv"
import cors from "cors"
import connetion from "./Connetions/MongoDB"
import UserModel from "./Models/User.Model"
dotenv.config()

const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.use("/api/v1", Router)

app.get("/insert", async (req: Request, res: Response, next: Function) => {
  return await UserModel.insertMany([
    {
      email: "sales1@crm.com",
      name: "Ahmed Sales",
      password: "123456",
      role: "sales",
      createdBy: "69c5ee8f1e2b2c651aee1560",
      manager: "69c5ee8f1e2b2c651aee1560",
      status: "active",
    },
    {
      email: "sales2@crm.com",
      name: "Sara Sales",
      password: "123456",
      role: "sales",
      createdBy: "69c5ee8f1e2b2c651aee1561",
      manager: "69c5ee8f1e2b2c651aee1561",
      status: "active",
    },
    {
      email: "sales3@crm.com",
      name: "Umar Sales",
      password: "123456",
      role: "sales",
      createdBy: "69c5ee8f1e2b2c651aee1562",
      manager: "69c5ee8f1e2b2c651aee1562",
      status: "active",
    },
    {
      email: "sales4@crm.com",
      name: "Hamza Sales",
      password: "123456",
      role: "sales",
      createdBy: "69c5ee8f1e2b2c651aee1562",
      manager: "69c5ee8f1e2b2c651aee1562",
      status: "active",
    },
    {
      email: "sales5@crm.com",
      name: "Ayesha Sales",
      password: "123456",
      role: "sales",
      createdBy: "69c5ee8f1e2b2c651aee1564",
      manager: "69c5ee8f1e2b2c651aee1564",
      status: "active",
    },
    {
      email: "sales6@crm.com",
      name: "Fatima Sales",
      password: "123456",
      role: "sales",
      createdBy: "69c5ee8f1e2b2c651aee1564",
      manager: "69c5ee8f1e2b2c651aee1564",
      status: "active",
    },
  ])
})

app.use(GlobalErrorHandler)

connetion().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening on port", process.env.PORT || 3000)
  })
})
