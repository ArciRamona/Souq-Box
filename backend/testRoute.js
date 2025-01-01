import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendTestEmail = async () => {
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: "test@example.com",
      subject: "Test Email",
      text: "This is a test email.",
    });
    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

sendTestEmail();
