const express = require("express");
const authController= require("../controllers/authControllers");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const validate = require("../middleware/validate");
const registerSchema = require("../validations/register");
const loginSchema = require("../validations/login");

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);
module.exports = router;
