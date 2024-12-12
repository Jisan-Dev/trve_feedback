/**
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/quickstart?lang=node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 400,
  responseMimeType: "text/plain",
};

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal theme that encourage friendly interaction. For example your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with a historical figure, who would it be?||What's a simple thing that makes you happy?'. Make sure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. \n Return new questions on each prompt.";
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    const generatedMessage = result.response.text();
    return Response.json({ success: true, message: generatedMessage });
  } catch (error) {
    console.log("Error occurred in generating Ai response ", error);
    // return response to client
    throw new Error("An error occurred in generating Ai response");
  }
}
