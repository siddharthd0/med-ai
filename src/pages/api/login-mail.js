// api/mail.js

import nodemailer from "nodemailer";

// Generate a random string
function generateRandomString() {
  return Math.random().toString(36).substring(7);
}

export async function sendLoginLink(email) {
  const randomString = generateRandomString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div>
      Click this link to login: 
      <a href="https://medsched.vercel.app/admindashboard?token=${randomString}">
        Login
      </a>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"MedSched.ai" <hr@techoptimum.org>',
      to: email,
      subject: "Login to MedSched",
      html,
    });

    return randomString;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
}
