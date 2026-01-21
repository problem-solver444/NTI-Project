const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware.protect);
// GET all users
router.get('/', authMiddleware.restrictTo('admin'), usersController.getAllUsers);

// GET user by id
router.get('/:id', usersController.getUserById);

// POST new user
router.post('/', authMiddleware.restrictTo('admin'), usersController.createUser);

// PATCH update user
router.patch('/:id', authMiddleware.restrictTo('admin'), usersController.updateUser);

// DELETE user
router.delete('/:id', authMiddleware.restrictTo('admin'), usersController.deleteUser);

module.exports = router;
