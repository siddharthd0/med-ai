import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const client = await MongoClient.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
  });

  const db = client.db('medsched'); // Database name

  try {
    const appointmentsCollection = db.collection('appointments'); // Collection name
    const appointments = await appointmentsCollection.find({}).toArray();

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    client.close();
  }
}
