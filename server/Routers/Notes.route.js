// Import the modules
const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/userToken');
const { createNote, getNotes, updateNote, deleteNote, getNotesByPriority, completeTask, clearCompleted, clearAll } = require('../controllers/Notes.controller');

// Notes Routes
router.post("/create-todo", verifyToken, createNote);
router.get("/get-todo", verifyToken, getNotes);
router.put("/update-todo/:id", verifyToken, updateNote);
router.delete("/delete-todo/:id", verifyToken, deleteNote)
// Get notes filtered by priority
router.get('/priority/:priority', verifyToken, getNotesByPriority);
// Completed Tasks route
router.put("/complete-todo/:id",verifyToken,completeTask)
// Clear Completed Tasks route
router.delete("/clear-completed",verifyToken,clearCompleted)
// Clear ALl tasks
router.delete("/clear-todo",verifyToken,clearAll)

module.exports = router
