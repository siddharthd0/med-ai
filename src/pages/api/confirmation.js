import nodemailer from "nodemailer";

export async function sendEmail(to, html) {
  console.log(
    "Environment Variables:",
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"MedSched.ai" <hr@techoptimum.org>',
      to: to,
      subject: "Appointment Confirmation",
      html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}
