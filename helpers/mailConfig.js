var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config()

/**
 * 
 * @param {*} file 
 * @param {*} document_path 
 * @param {*} receiver 
 * @param {*} subject 
 * @param {*} text 
 * @param {*} sender 
 */
const sendToNewUser = async (receiver, subject,email,password) => {
  try {
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.MAIL_ADRESSE,
        pass: process.env.MAIL_PWD,
      },
    });
    const mailOptions = {
      from:process.env.MAIL_ADRESSE,
      to: receiver,
      subject: subject,
      html:`<h2>your mail:${email}</h2> <br> <h2>your mail:${password}</h2> `
    };

    transporter.sendMail(mailOptions).then(function (info) {
      console.log("Email sent: " + info.response);
    }).catch(error => {
        console.log("error transporter :"+error.message)
    });

  } catch (error) {
    console.log("erreur lors de l'envois du mail"+error.message);
  }
}




const newMail = async (sender, receiver, subject, text,file,) => {
    try {
      const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.MAIL_ADRESSE,
          pass: process.env.MAIL_PWD,
        },
      });
      const mailOptions = {
        from:sender,
        to: receiver,
        subject: subject,
        text:text?text:'',
        attachments: [
          {
            filename: file?file:"",
            path: path.join(__dirname, "public/document"),
          },
        ],
      };
  
      transporter.sendMail(mailOptions).then(function (info) {
        console.log("Email sent: " + info.response);
      }).catch(error => {
          console.log("error transporter :"+error.message)
      });
  
    } catch (error) {
      console.log("erreur lors de l'envois du mail"+error.message);
    }
  }

  module.exports = {sendToNewUser, newMail}