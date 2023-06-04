// pages/api/prompt/[id]/like.js
import { ObjectId } from 'mongodb';
import { connectToDB } from '@utils/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const promptId = req.query.id;

  if (!ObjectId.isValid(promptId)) {
    res.status(400).json({ message: 'Invalid prompt ID' });
    return;
  }

  const { db } = await connectToDB();

  try {
    const prompt = await db.collection('prompts').findOneAndUpdate(
      { _id: new ObjectId(promptId) },
      { $inc: { likes: 1 } },
      { returnOriginal: false }
    );

    if (!prompt.value) {
      res.status(404).json({ message: 'Prompt not found' });
      return;
    }

    res.status(200).json({ likes: prompt.value.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
