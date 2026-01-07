const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userControllers");

// GET all users
router.get("/", usersController.getAllUsers);

// GET user by id
router.get("/:id", usersController.getUserById);

// POST new user
router.post("/", usersController.createUser);

// PATCH update user
router.patch("/:id", usersController.updateUser);

// DELETE user
router.delete("/:id", usersController.deleteUser);

module.exports = router;
