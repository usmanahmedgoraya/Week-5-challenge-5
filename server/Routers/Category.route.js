// Import the modules
const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller');
const router = express.Router();
// const verifyToken = require('../Middleware/userToken');


// Notes Routes
router.post("/create-category", createCategory);
router.get("/get-category", getCategories);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory)

module.exports = router