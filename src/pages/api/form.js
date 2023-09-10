import { MongoClient } from "mongodb";
import { sendEmail } from "./confirmation";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const {
    patientName,
    email,

    preferredTime,

    nature,

    reason,
  } = req.body;

  if (!patientName || !email || !preferredTime || !nature || !reason) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Connection URL and Database Name
  const url = process.env.MONGODB;
  const dbName = "medsched";

  try {
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    console.log("Connected to database");
    console.log("Received req.body: ", req.body);

    const db = client.db(dbName);
    const collection = db.collection("appointments");

    const result = await collection.insertOne({
      patientName,
      email,
      nature,

      preferredTime,

      reason,
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

    // Now you can use this HTML in your sendEmail function

    await sendEmail(email, emailHtml);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error occurred:", error);
    console.log("Received req.body: ", req.body);

    res
      .status(500)
      .json({ error: "An error occurred while scheduling the appointment." });
  }
}
