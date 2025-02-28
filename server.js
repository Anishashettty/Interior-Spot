const express = require("express");
const app = express();
const PORT = 3000;

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



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
