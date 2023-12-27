const express = require('express');
const cors = require('cors');
const app = express();
require('./db/connectdb');

const UserRoute = require('./Routers/user.route');
const NotesRoute = require('./Routers/Notes.route');
const CategoryRoute = require('./Routers/Category.route');

const port = 3000;

// Automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all routes
app.use(cors({
  origin: ["http://localhost:5173", "https://week-5-challenge-5-front-end.vercel.app"],
  methods: "GET, POST, OPTIONS, PATCH, DELETE, PUT",
  credentials: true,
}));

// Route to check if the server is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

// User Auth Route
app.use("/api/auth", UserRoute);
app.use("/api/notes", NotesRoute);
app.use("/api/category", CategoryRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Listening to Port
app.listen(port, () => {
  console.log(`Server is running on port ${port}. Waiting for DB Connection...`);
});
