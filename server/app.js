const express = require('express');
const cors = require('cors');
const app = express();
require('./db/connectdb')
// const ProductsRoute = require('./Routers/Products.route')
const UserRoute = require('./Routers/user.route')
const NotesRoute = require("./Routers/Notes.route")
const CategoryRoute = require("./Routers/Category.route")


// * Connecting To Port
const port = 3000;

// * Automatically parse incoming JSON to an object so we access it in our request handlers
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors({
  origin: ["http://localhost:5173","https://week-5-challenge-5-front-end.vercel.app"]
}));


// Set CORS headers manually
// Add middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" })
})
// app.use("/api", ProductsRoute);
// User Auth Route
app.use("/api/auth", UserRoute);
app.use("/api/notes", NotesRoute)
app.use("/api/category", CategoryRoute)

// * listening To Port
app.listen(port, () => {
  console.log(`This is the ${port} active port! Wait for DB Connection...`);
});
