var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

/**
 * 
 * @param {*} file 
 * @param {*} document_path 
 * @param {*} receiver 
 * @param {*} subject 
 * @param {*} text 
 * @param {*} sender 
 */
module.exports = async (file, document_path, receiver, subject, text,sender) => {
  try {
    const transporter = nodemailer.createTransport({
      service:"gmail",
      secure: true,
      auth: {
        user: process.env.MAIL_ADRESSE,
        pass: process.env.MAIL_PWD,
      },
    });
    const mailOptions = {
      from:sender,
      to: receiver,
      subject: subject,
      text:text,
      attachments: [
        {
          filename: file,
          path: path.join(__dirname, document_path),
        },
      ],
    };
    transporter.sendMail(mailOptions).then(function (info) {
      console.log("Email sent: " + info.response);
    }).catch(error => {
    });

  } catch (error) {
    console.log("erreur lors de l'envois du mail");
  }
}