import { sendEmail } from "./confirmation";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  let { email, phoneNumber, doctors_note, change_reason, start_time } = req.body;
  change_reason = change_reason || "No reason provided, preferred time given";

  if (!email || !phoneNumber || !doctors_note ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const appointmentDate = new Date(start_time);
    const userFriendlyDate = `${appointmentDate.toLocaleDateString()} at ${appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const emailHtml = `
      <div>
        <p>Your appointment time has been changed to ${userFriendlyDate}</p>
        <p>Reason: ${change_reason}</p>
        <p>Doctor's Note: ${doctors_note}</p>
      </div>
    `;

    await sendEmail(email, emailHtml);
    
    // Code to send SMS via Twilio
    const smsText = `Your appointment time has been confirmed for ${userFriendlyDate}.\n\nReason why was time was changed: ${change_reason}. \n\nDoctor's Note: ${doctors_note}`;
    await client.messages.create({
        body: smsText,
        from: '+18449412421', // replace with your Twilio number
        to: phoneNumber
      });
      

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred while sending the notification." });
  }
}
