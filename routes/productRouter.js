const express= require("express");
const productControllers=require("../controllers/productControllers.js");
const authMiddleware=require("../middleware/auth.js");
const router=express.Router();
router.use(authMiddleware.protect);
router.get("/",productControllers.getAllProducts);
router.get("/:id",productControllers.getProductById);
router.post("/",productControllers.createProduct);
router.patch("/:id",productControllers.updateProduct);
router.delete("/:id",productControllers.deleteProduct);

module.exports=router;