// pages/api/login.js
import { connectToDatabase } from "../../utils/connectToDatabase";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Create session, JWT, etc.

  return res.status(200).json({ success: true });
};
