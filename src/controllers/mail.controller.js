const nodemailer = require("nodemailer");

mailController = {};

mailController.main = async (req, res) => {
  const { email, message } = req.body;
  console.log(req.body);
  const textMessage = `
  <h2>Mensaje de ${email}</h2>
  <h3>Contenido:</h3>
  <p>${message}</p>`;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAILHOST,
    port: process.env.EMAILPORT,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: "DGB Development web <info@dgbdevelopment.com>",
      to: "dgranyo@gmail.com",
      subject: "Mensaje recibido en web DGB Development",
      html: textMessage,
    });
    res.send({ message: "Mensaje enviado correctamente", color: "green" });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Error en el servidor. Mensaje no enviado",
      color: "red",
    });
  }
};

module.exports = mailController;
