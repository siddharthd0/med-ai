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
    const loginUrl = `https://medsched.vercel.app/admindashboard?email=${encodeURIComponent(
      email
    )}&name=${encodeURIComponent(name)}`;

    const emailHtml = `
    <div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif;">
     
      <div style="background-color: white; margin: 10px auto; padding: 20px; max-width: 600px; border-radius: 4px;">
          <h1 style="color: #444444; font-size: 24px;">Hello ${
            name || "User"
          },</h1>
          <p style="font-size: 16px; color: #666666; line-height: 1.5;">Thank you for attempting to log in. Here is your login link.</p>
          <a href="${loginUrl}" style="background-color: #4A154B; color: white; text-decoration: none; padding: 10px 20px; margin: 5px 0; display: inline-block; border-radius: 4px;">Login</a>
          <p style="font-size: 16px; color: #666666; line-height: 1.5;">Thank you for choosing MedSched.ai. 🌟</p>
      </div>
      <div style="color: #666666; font-size: 14px; text-align: center; padding: 20px;">
         
    
          <p>For any inquiries, please email <a href="mailto:siddharth@techoptimum.org" style="color: #4A154B;">MedSched</a></p>
      </div>
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
