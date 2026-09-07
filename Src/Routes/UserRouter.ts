import express from "express"
import UserController from "../Controller/UserController"
import Authentication from "../Middlewares/Authentication"
import Role from "../Middlewares/Role"
import Audit from "../Middlewares/Audit"
import UAParser from "ua-parser-js"
const UserRouter = express.Router()
UserRouter.post("/login", UserController.login)
UserRouter.post(
  "/",
  Authentication.authorization,
  Role.validateRoleForCreation,
  Audit.creationAudit,
  UserController.create,
)
UserRouter.patch(
  "/profile",
  Authentication.authorization,
  UserController.update,
)
UserRouter.get("/profile", Authentication.authorization, UserController.query)

UserRouter.get("/user-info",(req:Request,res:Response)=>{
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
export default UserRouter
