// pages/api/getUserData.js

import { connectToDatabase } from "@/utils/connectToDatabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // Connect to your MongoDB

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send back user data
    res.status(200).json(user);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
