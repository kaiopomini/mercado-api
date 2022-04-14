import { Router } from "express";
import multer from 'multer';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

import { AccessControlListController } from "../controllers/admin/AccessControlListController";
import { CustomerController } from "../controllers/admin/CustomerController";
import { PermissionController } from "../controllers/admin/PermissionController";
import { ProductCategoryController } from "../controllers/admin/ProductCategoryController";
import { ProductController } from "../controllers/admin/ProductController";
import { RoleController } from "../controllers/admin/RoleController";
import { RolePermissionController } from "../controllers/admin/RolePermissionController";
import { ProductCategoryImageController } from "../controllers/file/ProductCategoryImageController";
import { ProductImageController } from "../controllers/file/ProductImageController";
import { UserImageController } from "../controllers/file/UserImageController";
import { storeCustomerSchema, updateCustomerSchema } from "../inputValidations/admin/Customer";
import { storeProductSchema } from "../inputValidations/admin/Product";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

const roleController = new RoleController();
const permissionController = new PermissionController();
const rolePermissionController = new RolePermissionController();
const accessControlListController = new AccessControlListController();
const productController = new ProductController();
const productCategoryController = new ProductCategoryController();
const customerController = new CustomerController();
const productImageController = new ProductImageController();
const userImageController = new UserImageController();
const productCategoryImageController = new ProductCategoryImageController();

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

//categories
router.post("/categories", productCategoryController.store);
router.get("/categories", productCategoryController.index);
router.get("/categories/input-labels", productCategoryController.labelsForInput);
router.get("/categories/:id", productCategoryController.show);
router.put("/categories/add-products", productCategoryController.addProducts);
router.put("/categories/remove-products", productCategoryController.removeProducts);
router.put("/categories/:id", productCategoryController.update);
router.delete("/categories/:id", productCategoryController.destroy);

//files
router.post("/files/images/products", upload.single('image'), productImageController.store);
router.post("/files/images/users", upload.single('image'), userImageController.store);
router.post("/files/images/products-categories", upload.single('image'), productCategoryImageController.store);

export { router as adminRoutes }