import CustomerController from "../Controller/CustomerController";
import express from "express";
import AdminAuth from "../Middlewares/Auth";
import Admin from "../Models/Admin";
import AdminController from "../Controller/AdminController";
const router = express.Router();
router.post("/admin/signup", AdminController.create);
router.post("/admin/login", AdminController.login);
router.post("/admin/customers", AdminAuth.auth, CustomerController.create);
router.get("/admin/customers", AdminAuth.auth, CustomerController.query);
router.get(
  "/admin/customers/:id",
  AdminAuth.auth,
  CustomerController.querySpecific
);
router.patch("/admin/customers/:id", AdminAuth.auth, CustomerController.update);
router.delete(
  "/admin/customers/:id",
  AdminAuth.auth,
  CustomerController.delete
);
router.post("/admin/customers/:id/deals");
router.patch("/admin/customers/:id/deals");
router.delete("/admin/customers/:id/deals");
router.get("/admin/customers/:id/deals");
export default router;
