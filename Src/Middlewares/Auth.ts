import { Request, Response } from "express";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import Admin from "../Models/Admin";
import AdminInterface from "../Interfaces/AdminInterface";
import signToken from "./Token";
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const AdminAuth = {
  auth: async (req: Request, res: Response, next: Function) => {
    let header = req.get("admin");
    if (!header || typeof header !== "string") {
      throw new ErrorHandler(401, "no token provided");
    }
    const token = header.split("_")[1];
    if (!token) {
      throw new ErrorHandler(401, "no token provided");
    }
    const isValid = await jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) {
      throw new ErrorHandler(405, "invalid or expired token");
    }
    const user = await Admin.findById(isValid.id);
    if (!user) {
      throw new ErrorHandler(404, "Admin not found");
    }
    return next();
  },
};
export default AdminAuth;
