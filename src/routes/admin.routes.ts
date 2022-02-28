import { Router } from "express";


import { AccessControlListController } from "../controllers/admin/AccessControlListController";
import { CustomerController } from "../controllers/admin/CustomerController";
import { PermissionController } from "../controllers/admin/PermissionController";
import { ProductController } from "../controllers/admin/ProductController";
import { RoleController } from "../controllers/admin/RoleController";
import { RolePermissionController } from "../controllers/admin/RolePermissionController";
import { storeCustomerSchema, updateCustomerSchema } from "../dataModels/requests/Customer";
import { storeProductSchema } from "../dataModels/requests/Product";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

const roleController = new RoleController();
const permissionController = new PermissionController();
const rolePermissionController = new RolePermissionController();
const accessControlListController = new AccessControlListController();
const productController = new ProductController();
const customerController = new CustomerController();

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

//customers
router.post("/customers", storeCustomerSchema, validateRequest, customerController.store);
router.get("/customers", customerController.index);
router.get("/customers/:id", customerController.show);
router.put("/customers/:id", updateCustomerSchema, validateRequest, customerController.update);
router.delete("/customers/:id", customerController.destroy);

export { router as adminRoutes }