import express,{Request,Response} from "express";
import CustomersRouter from "../Routes/CustomersRouter"
const router=express.Router();
router.use("/api/customers",CustomersRouter);
export default router