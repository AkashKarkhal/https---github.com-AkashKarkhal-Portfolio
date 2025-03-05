require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Email Sending Route
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASSWORD 
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: "akashkarkhal.23@gmail.com",
            subject: `New Contact Form Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error("Email Error:", error);
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
