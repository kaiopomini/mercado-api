import { Router } from "express";


import { AccessControlListController } from "../controllers/admin/AccessControlListController";
import { CostumerController } from "../controllers/admin/CostumerController";
import { PermissionController } from "../controllers/admin/PermissionController";
import { ProductController } from "../controllers/admin/ProductController";
import { RoleController } from "../controllers/admin/RoleController";
import { RolePermissionController } from "../controllers/admin/RolePermissionController";
import { storeCostumerSchema, updateCostumerSchema } from "../dataModels/requests/Costumer";
import { storeProductSchema } from "../dataModels/requests/Product";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

const roleController = new RoleController();
const permissionController = new PermissionController();
const rolePermissionController = new RolePermissionController();
const accessControlListController = new AccessControlListController();
const productController = new ProductController();
const costumerController = new CostumerController();

// permissions
router.post("/roles", roleController.store);
router.post("/permissions", permissionController.store);
router.post("/acl", accessControlListController.store);
router.post("/roles-permissions", rolePermissionController.store);

//products
router.post("/products", storeProductSchema, validateRequest, productController.store);
router.get("/products", productController.index);
router.get("/products/:id", productController.show);
router.put("/products/:id", storeProductSchema, validateRequest, productController.update);
router.delete("/products/:id", productController.destroy);

//costumers
router.post("/costumers", storeCostumerSchema, validateRequest, costumerController.store);
router.get("/costumers", costumerController.index);
router.get("/costumers/:id", costumerController.show);
router.put("/costumers/:id", updateCostumerSchema, validateRequest, costumerController.update);
router.delete("/costumers/:id", costumerController.destroy);

export { router as adminRoutes }