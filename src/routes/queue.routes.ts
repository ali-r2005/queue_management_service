import { Router } from "express";
import { queueControllerCrud } from "../controllers/queueCrud.controller";
import { queueManagementController } from "../controllers/queueManagement.controller";

const router = Router();

//CRUD
router.get("/", queueControllerCrud.getQueues);
router.post("/", queueControllerCrud.createQueue);
router.put("/:id", queueControllerCrud.updateQueue);
router.delete("/:id", queueControllerCrud.deleteQueue);

//MANAGEMENT
router.post("/add-customer", queueManagementController.addCustomerToQueue);
router.get("/customers-queue", queueManagementController.getCustomersQueue);
router.delete("/remove-customer/:id", queueManagementController.removeCustomerFromQueue);
router.put("/move-customer/:id", queueManagementController.moveCustomerToPosition);
router.put("/mark-customer-as-late/:id", queueManagementController.markCustomerAsLate);
router.get("/late-customers/:id", queueManagementController.getLateCustomers);
router.put("/reinstate-customer/:id", queueManagementController.reinstateCustomer);
router.put("/serve-customer/:id", queueManagementController.serveCustomer);
router.put("/served-customer/:id", queueManagementController.servedCustomer);

export default router;
