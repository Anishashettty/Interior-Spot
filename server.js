const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
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


app.get("/contact", (req, res) => {
    res.render("partials/contact", { showThankYou: false });
});

app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.render("partials/contact", { showThankYou: true });
    } catch (error) {
        console.error(error);
        res.send("Error sending email. Try again later.");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
