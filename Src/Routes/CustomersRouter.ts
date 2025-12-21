import CustomerController from "../Controller/CustomerController";
import  express  from "express";
const router = express.Router();

router.post("/", CustomerController.create);
router.get("/", CustomerController.query);
router.get("/:id", CustomerController.querySpecific);
router.patch("/:id", CustomerController.update);
router.delete("/:id", CustomerController.delete);

export default router;
