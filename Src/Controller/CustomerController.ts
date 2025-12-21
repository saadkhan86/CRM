import express, {Request, Response } from "express";
import CustomerRepo from "../Repositories/CustomerRepo";
import CustomerInterface from "../Interfaces/CustomerInterface";

const CustomerController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const newCustomer = await CustomerRepo.create(req.body);
      res.status(200).json({ success: true, data: newCustomer });
    } catch (error) {
      return next(error,req,res);
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const updateCustomer = await CustomerRepo.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: updateCustomer });
    } catch (error) {
      return next(error,req,res);
    }
  },
  delete: async (req: Request, res: Response, next: Function) => {
    try {
      const deleteCustomer = await CustomerRepo.delete(req.params.id);
      res.status(200).json({ success: true, data: deleteCustomer });
    } catch (error) {
      return next(error,req, res);
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const token = Array.isArray(req.headers["admin"])
        ? req.headers["admin"][0]?.split("_")[1]
        : req.headers["admin"]?.split("_")[1];
      if (!token) {
        throw new Error("No token provided");
      }
      const query: CustomerInterface.query = {
        page: Number(req.query.page) || 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        order: Number(req.query.order) === -1 ? -1 : 1,
        search:
          typeof req.query.search === "string" ? req.query.search : undefined,
      };
      const foundCustomers = await CustomerRepo.query(query);
      res.status(200).json({ success: true, data: foundCustomers });
    } catch (error) {
      return next(error,req, res);
    }
  },
  querySpecific: async (req: Request, res: Response, next: Function) => {
    try {
      const findSpecificCustomer = await CustomerRepo.querySpecific(
        req.params.id
      );
      res.status(200).json({ success: true, data: findSpecificCustomer });
    } catch (error) {
      return next(error,req, res);
    }
  },
};
export default CustomerController;
