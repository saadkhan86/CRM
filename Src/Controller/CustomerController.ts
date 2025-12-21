import express, { NextFunction, Request, Response } from "express";
import CustomerRepo from "../Repositories/CustomerRepo";
import { wrapAsync } from "../Utils/wrapAsync";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import CustomerInterface from "../Interfaces/CustomerInterface";

const CustomerController = {
  create: wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.body ||
      Object.keys(req.body).length === 0 ||
      Object.keys(req.body).length < 6
    ) {
      throw new ErrorHandler(401, "fill required fields");
    }
    const newCustomer = await CustomerRepo.create(req.body);
    res.status(200).json({ success: true, data: newCustomer });
  }),
  update: wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updateCustomer = await CustomerRepo.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updateCustomer });
  }),
  delete: wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deleteCustomer = await CustomerRepo.delete(req.params.id);
    res.status(200).json({ success: true, data: deleteCustomer });
  }),
  query: wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = Array.isArray(req.headers["admin"])
      ? req.headers["admin"][0]?.split("_")[1]
      : req.headers["admin"]?.split("_")[1];
    if (!token) {
      throw new ErrorHandler(401, "No token provided");
    }
    const query:CustomerInterface.query={
      page: Number(req.query.page) || 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      order:Number(req.query.order)===-1?-1:1,
      search:
        typeof req.query.search === "string"
        ? req.query.search
        : undefined,
    }
    const foundCustomers = await CustomerRepo.query(query);
    res.status(200).json({ success: true, data: foundCustomers });
  }),
  querySpecific: wrapAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const findSpecificCustomer = await CustomerRepo.querySpecific(
        req.params.id
      );
      res.status(200).json({ success: true, data: findSpecificCustomer });
    }
  ),
};
export default CustomerController;
