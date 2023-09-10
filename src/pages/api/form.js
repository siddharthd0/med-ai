import { MongoClient } from "mongodb";
import { sendEmail } from "./confirmation";
const accountSid =
  process.env.TWILIO_ACCOUNT_SID || "ACc748238ca8a1f58912b6cb1d9331e8a3";
const authToken =
  process.env.TWILIO_AUTH_TOKEN || "824d8ba04b26bcb3d059b39a730a9d1a";
const client = require("twilio")(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { patientName, email, preferredTime, nature, reason, phoneNumber } =
    req.body;

  if (!patientName || !email || !preferredTime || !nature || !reason) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const url = process.env.MONGODB;
  const dbName = "medsched";

  try {
    const mongoClient = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoClient.connect();

    const db = mongoClient.db(dbName);
    const collection = db.collection("appointments");

    const result = await collection.insertOne({
      patientName,
      email,
      nature,
      preferredTime,
      reason,
      phoneNumber,
      createdAt: new Date(),
    });

    console.log("Insert Result:", result);
    console.log("Received req.body: ", req.body);
    const emailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; color: #333333; padding: 20px;">
      <h2 style="color: #0044cc; font-weight: bold;">📆 MedSched.ai Appointment Confirmation</h2>
      <p style="font-weight: normal;">Dear ${patientName},</p>
      <p style="font-weight: normal;">Thank you for scheduling your appointment with us. Please note that your preferred time is subject to confirmation as our AI is working to find the most suitable time for everyone. 🕒</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; border: 1px solid #d1d5db; border-radius: 8px;">
        <ul style="list-style: none; padding: 0;">

          <li style="margin-bottom: 10px;"><strong style="color: #0044cc;">Preferred Time:</strong> <span style="font-weight: normal;">${preferredTime}</span></li>
          <li style="margin-bottom: 10px;"><strong style="color: #0044cc;">Nature of Visit:</strong> <span style="font-weight: normal;">${nature}</span></li>
          <li style="margin-bottom: 10px;"><strong style="color: #0044cc;">Reason for Visit:</strong> <span style="font-weight: normal;">${reason}</span></li>
        </ul>
      </div>
      <p style="font-weight: normal; margin-top: 20px;">Thank you for choosing MedSched.ai. We look forward to providing you with top-notch healthcare services. 🌟</p>
    </div>
  `;

    await sendEmail(email, emailHtml);
    client.messages
      .create({
        body: `Hey ${patientName}, your appointment is booked for ${preferredTime} but is subject to change due to our AI rescheduling appointments to fit patients on a needs-basis.`,
        from: "+18449412421",
        to: phoneNumber,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error));

    res.status(201).json({ success: true });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error occurred:", error);
    console.log("Received req.body: ", req.body);
    console.error("Error occurred:", error);

    res
      .status(500)
      .json({ error: "An error occurred while scheduling the appointment." });
  }
}
