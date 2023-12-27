const Notes = require('../Models/Notes.model');
const Category = require("../Models/Category.model")
const mongoose = require('mongoose');

// In createNote function
const createNote = async (req, res) => {
    try {
        const { title, description, categories, priority } = req.body;
        // Create an array to store the category IDs
        const categoryIds = [];

        // Check if categories is present and is an array
        if (Array.isArray(categories)) {
            // Loop through the categories in the request body
            for (const categoryName of categories) {
                // Check if the category already exists
                let existingCategory = await Category.findOne({ name: categoryName });

                // If the category doesn't exist, create it
                if (!existingCategory) {
                    existingCategory = new Category({ name: categoryName });
                    await existingCategory.save();
                }

                // Add the category ID to the array
                categoryIds.push(existingCategory._id);
            }
        }

        const note = new Notes({
            user: req.user.user._id,
            title,
            description,
            categories: categoryIds,
            // Add priority to the note
            priority,
        });
        await note.save();
        // Populate the categories field in the response
        const populatedNote = await Notes.findById(note._id).populate('categories');

        res.status(201).json({ note: populatedNote });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
// Get all notes
const getNotes = async (req, res) => {
    try {
        // Find all notes for the user
        const notes = await Notes.find({ user: req.user.user._id })
            .populate('categories');

        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).send('Some unexpected Error Occurred!!!');
    }
};

// In updateNote function
const updateNote = async (req, res) => {
    try {
        // Destructure the data from request.body
        const { title, description, categories, priority } = req.body;

        // Validate and convert category names to category IDs
        const validCategoryIds = await Promise.all(categories.map(async categoryName => {
            // Try to find the category by name
            const category = await Category.findOne({ name: categoryName });

            // If the category exists, return its ObjectId; otherwise, create a new category
            return category ? category._id : new Category({ name: categoryName }).save();
        }));

        // Find and update the note in a single operation
        const updatedNote = await Notes.findOneAndUpdate(
            { _id: req.params.id, user: req.user.user._id }, // Query criteria
            {
                $set: {
                    title,
                    description,
                    categories: validCategoryIds,
                    priority, // Update priority
                }
            },
            // Update fields
            { new: true }
            // Return the modified document
        ).populate('categories');

        // Check if the note was not found or the user does not own it
        if (!updatedNote) {
            return res.status(401).send('Not Allowed');
        }

        res.status(200).json({ note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: 'Some unexpected Error Occurred!!!', error: error.message });
    }
};


// Delete a note
const deleteNote = async (req, res) => {
    try {
        // Find the note are Deleted and Delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Request not Found');
        }
        // Allow deletion if user own this Note
        if (note.user.toString() !== req.user.user._id) {
            return res.status(401).send('Not Allowed');
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ note: note, 'Success': "Your note is successfully deleted" });
    } catch (error) {
        console.error(error.massage);
        res.status(500).send('Some unexpected Error Occured!!!');
    }
};
// Priority Filter Controller
const getNotesByPriority = async (req, res) => {
    try {
        const { priority } = req.params;
        // Find all notes for the user filtered by priority
        const notes = await Notes.find({ user: req.user.user._id, priority })
            .populate('categories');

        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).send('Some unexpected Error Occurred!!!');
    }
};

// Completed Logic
const completeTask = async (req, res) => {
    try {
        const { id } = req.params;
        let note = await Notes.findById(id);

        if (!note) {
            return res.status(404).json({ Success: false, error: "Task not found" });
        }

        if (note.user.toString() !== req.user.user._id) {
            return res.status(401).json({ Success: false, error: "Not Authorized" });
        }

        // Update only the fields that need to be modified
        await Notes.updateOne({ _id: id }, { isCompleted: !note.isCompleted });

        // Fetch the updated note
        note = await Notes.findById(id);

        res.status(200).json({ Success: true, note });
    } catch (error) {
        res.status(500).json({ Success: false, error: error.message });
    }
};

// Clear Completed Task
const clearCompleted = async (req, res) => {
    try {
        if (!req.user.user._id) {
            return res.status(401).json({ Success: false, error: "Not Authorized" });
        }
        const completedTodos = await Notes.deleteMany({ isCompleted: true })
        res.status(200).json({ msg: "All completed tasks deleted", completedTodos })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Clear All Task
const clearAll = async (req, res) => {
    try {
        if (!req.user.user._id) {
            return res.status(401).json({ Success: false, error: "Not Authorized" });
        }
        const clearAll = await Notes.deleteMany({});
        res.status(200).json({ message: 'All Todos deleted successfully', clearAll });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createNote, getNotes, updateNote, deleteNote, getNotesByPriority, completeTask, clearCompleted,clearAll };
