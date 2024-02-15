require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");

const app = express();
const PORT = 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/send-email", async (req, res) => {
  console.log(req.body);
  const { name, lastname, email, phonenumber, message, address } = req.body;
  const content = `
        Name: ${name} ${lastname}
        Email: ${email}
        Phone: ${phonenumber}
        Message: ${message}
        Address: ${address}
    `;

  const msg = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: "New contact message",
    text: content,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending the email:", error);
    res
      .status(500)
      .json({ success: false, message: "Error sending the email" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
