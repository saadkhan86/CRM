import { Request, Response } from "express";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import AdminRepo from "../Repositories/AdminRepo";
const AdminController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      let { name, email, password } = req.body;
      if (!email || !password || !name) {
        throw new ErrorHandler(400, "please fill required fields");
      }
      const admin = await AdminRepo.create(req.body);
      res.status(200).json({success:true,data:admin})
    } catch (error) {
      return next(error, req, res);
    }
  },
  login: async (req: Request, res: Response, next: Function) => {
    try {
      let {email, password } = req.body;
      if (!email || !password) {
        throw new ErrorHandler(400, "please fill required fields");
      }
      const admin = await AdminRepo.login(req.body);
      res.status(200).json({success:true,data:admin})
    } catch (error) {
      return next(error, req, res);
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const id=req.params.id;
      if(!id){
        throw new ErrorHandler(400,"Id is not provided");
      }
      const admin=await AdminRepo.update(id,req.body);
      res.status(200).json({success:true,data:admin})
    } catch (error) {
      return next(error, req, res);
    }
  },
};
export default AdminController;
