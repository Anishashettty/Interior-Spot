const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/contact");
const dotenv = require("dotenv");

dotenv.config();


// Contact Form Route
router.get("/", (req, res) => {
    res.render("partials/contact", { showThankYou: false });
});

// Handle Form Submission
router.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    try {

        // Send Email Notification
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

        await transporter.sendMail(mailOptions);
        res.render("partials/contact", { showThankYou: true });

    } catch (error) {
        console.error(error);
        res.send("Error processing your request. Try again later.");
    }
});

module.exports = router;
