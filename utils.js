"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(
  name,
  email,
  phone,
  subject = "Contact from from SousChef.dev",
  message
) {
  if (!validateEmail(email)) {
    return { error: "Emails address is not valid" };
  }
  if (!message || message.trim() === "") {
    return { error: "Message body is empty" };
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  const msg = `<html>
                <head>
                <style type="text/css">
                thead,
                tfoot {
                    background-color: #3f87a6;
                    color: #fff;
                }

                tbody {
                    background-color: #e4f0f5;
                }

                caption {
                    padding: 10px;
                    caption-side: bottom;
                }

                table {
                    border-collapse: collapse;
                    border: 2px solid rgb(200, 200, 200);
                    letter-spacing: 1px;
                    font-family: sans-serif;
                    font-size: .8rem;
                }

                td,
                th {
                    border: 1px solid rgb(190, 190, 190);
                    padding: 5px 10px;
                }

                td {
                    text-align: center;
                }
                </style>
                </head>
                <body>
                    <table>
                        <caption>${subject}</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">${name}</th>
                                <td>${phone}</td>
                                <td>${email}</td>
                                <td>${message}</td>
                            </tr>
                        </tbody>
                    </table>
                </body>
            </html> `;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: email, // sender address
    to: "artanmuzhaqi@gmail.com", // list of receivers
    subject: subject, // Subject line
    html: msg,
  });

  return { success: `"Message sent: ${info.messageId}` };
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// sendEmail().catch(console.error);

module.exports = { sendEmail };
