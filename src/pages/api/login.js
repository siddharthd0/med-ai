import { sendEmail } from "./confirmation"; // Make sure to have the sendEmail function properly defined and exported in this file.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email field is required." });
  }

  try {
    const loginUrl = `http://localhost:3000/admindashboard?email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(name)}`;
      
    const emailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; color: #333333; padding: 20px;">
      <h2 style="color: #0044cc; font-weight: bold;">📆 MedSched.ai Login Confirmation</h2>
      <p style="font-weight: normal;">Dear ${name || "User"},</p>
      <p style="font-weight: normal;">Thank you for attempting to log in. Here is your login link.</p>
      <a href="${loginUrl}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; border: none; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Login</a>
      <p style="font-weight: normal; margin-top: 20px;">Thank you for choosing MedSched.ai. 🌟</p>
    </div>
  `;

    await sendEmail(email, emailHtml);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
}
