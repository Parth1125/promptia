import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
// Get (read one specific prompt)

export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// Patch

// Delete
