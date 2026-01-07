const express = require("express");
const authController= require("../controllers/authControllers");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login",  authController.login);
router.get("/me", authMiddleware.protect, authController.getMe);

// مثال على حماية روت مخصص للأدمن
router.get("/admin-test", authMiddleware.protect, authMiddleware.restrictTo("admin"), (req, res) => {
  res.json({ message: "Welcome admin 🎩" });
});

module.exports = router;
