import express,{Request,Response} from "express";
import CustomersRouter from "./AdminCustomer"
const router=express.Router();
router.use("/api",CustomersRouter);
export default router