import GlobalErrorHandler from "./ErrorHandler/GlobalErrorHandler"
import express, { Request, Response } from "express"
import Router from "./Routes/router"
import dotenv from "dotenv"
import cors from "cors"
import connetion from "./Connetions/MongoDB"
import { UAParser } from "ua-parser-js"
dotenv.config()
const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" }))
app.get("/", (req: Request, res: Response) => {
  const ip = req.ip;
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();
  const browser = `${result.browser.name || "Unknown"} ${
    result.browser.version || ""
  }`;
  const os = `${result.os.name || "Unknown"} ${
    result.os.version || ""
  }`;
  const device = result.device.type || "Desktop";
  const time = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  res.status(201).json({ success: true, message: "Server is running", ip,
    browser,
    os,
    device,
    time})
})
app.use("/api/v1", Router)

app.use(GlobalErrorHandler)

connetion().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening on port", process.env.PORT || 3000)
  })
})
