const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const mongoose=require("mongoose");
dotenv.config();

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Serve static files (CSS, JS, images)
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("index", { title: "Home Page", message: "Welcome to My Website!" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About Page" });
});


const contactRoutes = require("./routes/contactRoutes");
app.use("/contact", contactRoutes);

// MongoDB connection string
// const MONGO_URI = process.env.MONGO_URI;

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected Successfully!"))
//   .catch((err) => console.error(" MongoDB Connection Error:", err));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
