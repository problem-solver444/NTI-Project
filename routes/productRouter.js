const express= require("express");
const productControllers=require("../controllers/productControllers.js");
const authMiddleware=require("../middleware/auth.js");
const router=express.Router();



router.use(authMiddleware.protect);
router.get("/",productControllers.getAllProducts);
router.get("/:id",productControllers.getProductById);
router.post("/",authMiddleware.restrictTo("admin"),productControllers.createProduct);
router.patch("/:id",authMiddleware.restrictTo("admin"),productControllers.updateProduct);
router.delete("/:id",authMiddleware.restrictTo("admin"),productControllers.deleteProduct);

module.exports=router;