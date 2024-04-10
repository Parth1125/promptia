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
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};
// Delete

export const DELETE = async (request, { params }) => {
  try {
    await connectToDb();
    await Prompt.deleteOne({ _id: params.id });
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
