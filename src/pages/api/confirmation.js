import nodemailer from "nodemailer";

export async function sendEmail(to, html) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // or any other provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"MedSched.ai" <hr@techoptimum.org>', // sender address
    to: to, // list of receivers
    subject: "Appointment Confirmation", // Subject line
    html, // HTML body content
  });

  console.log("Message sent: %s", info.messageId);
}
