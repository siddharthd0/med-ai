import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const {
    patientName,
    email,
    preferredDate,
    preferredTime,
    consultationType,
    doctorPreference,
    reason,
  } = req.body;

  if (
    !patientName ||
    !email ||
    !preferredDate ||
    !preferredTime ||
    !consultationType ||
    !reason
  ) {
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
      preferredDate,
      preferredTime,
      consultationType,
      doctorPreference,
      reason,
      createdAt: new Date(),
    });

    console.log("Insert Result:", result);
    console.log("Received req.body: ", req.body);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error occurred:", error);
    console.log("Received req.body: ", req.body);

    res
      .status(500)
      .json({ error: "An error occurred while scheduling the appointment." });
  }
}
