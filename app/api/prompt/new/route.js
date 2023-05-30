import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: 'CLOUDINARY_CLOUD_NAME',
    api_key: 'CLOUDINARY_API_KEY',
    api_secret: 'CLOUDINARY_API_SECRET',
  });

export const POST = async (request) => {
  const { userId, prompt, tag, image } = await request.json();
  const photoUrl = await cloudinary.uploader.upload(image)

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
      image: photoUrl.url
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
