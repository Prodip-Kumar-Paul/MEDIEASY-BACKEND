import Config from '../config/config.js';
import nodemailer from 'nodemailer';
//create transporter
let transporter = nodemailer.createTransport({
  service:"Gmail",
  auth: {
    user: Config.EMAIL,
    pass: Config.PASSWORD,
  },
});
//console.log(transporter);

//sending mail
export const sendMail = async (emailTo, subject, text, html, file) => {
  try {
    let defaultmailOption = {
      from: Config.EMAIL,
      to: emailTo,
      subject: subject,
      text: text,
      html: html,
    };
    let mailOption = {};
    if (file) {
      mailOption = {
        ...defaultmailOption,
        attachments: [
          {
            filename: "receipt",
            path: file,
          },
        ],
      };
    } else {
      mailOption = {
        ...defaultmailOption,
      };
    }
    //console.log(mailOption);
    let resp = await transporter.sendMail(mailOption);
    console.log(resp);
    return resp;
  } catch (err) {
    console.log(err);
  }
};