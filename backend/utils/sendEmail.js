// Send Password Recovery Message to the user account
// Configure Nodemailer & Reset Password
// npm install nodemailer --save

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Function to send emails
const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service provider (e.g., Gmail, Yahoo, Outlook)
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // Sender gmail address
      pass: process.env.SMTP_APP_PASSWORD, // App password from gmail account
    },
    debug: true, // Enable SMTP debug output
    logger: true, // Log SMTP communication to the console
  });

  // Create a message object for sending email.
  const message = {
    from: `${process.env.SMTP_USER} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  // It will send the message to the user email address
  await transport.sendMail(message);
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent sucessfully");
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;
