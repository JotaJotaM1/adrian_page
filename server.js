const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors'); // Importa el middleware cors

const app = express();
const PORT = 3000;

sgMail.setApiKey('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');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Usa el middleware cors para habilitar CORS

app.post('/send-email', async (req, res) => {
    const { name, lastname, email, phonenumber, message } = req.body;

    const content = `
        Nombre: ${name} ${lastname}
        Email: ${email}
        Teléfono: ${phonenumber}
        Mensaje: ${message}
    `;

    const msg = {
        to: 'service@ezpaintnow.com',
        from: 'service@ezpaintnow.com',
        subject: 'New contact message',
        text: content,
    };

    try {
        await sgMail.send(msg);
        res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error('Error sending the email:', error);
        res.status(500).send('Error sending the email');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
