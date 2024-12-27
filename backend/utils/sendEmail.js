// Configure Nodemailer & Reset Password
// npm install nodemailer --save

import nodemailer from "nodemailer";

// Function to send emails
const sendEmail = async (option) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Create a message object for sending email.
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_email}>`,
    to: option.email,
    subject: option.subject,
    html: option.message,
  };
  // It will send the message to the user email address
  await transport.sendMail(message);
};

export default sendEmail;
