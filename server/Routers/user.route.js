const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/userToken');
const userController = require('../controllers/user.controller'); // Updated import

router.post("/register", userController.registerUser);
router.post("/activate-user", userController.activateUser);
router.post("/login", userController.loginUser);
router.post("/sign-in", verifyToken, userController.signinUser);
router.post("/update/:id", userController.UpdateUser); // Corrected route parameter syntax

module.exports = router;