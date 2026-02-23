import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();  // Load environment variables

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIResponse(userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
       {
  role: "system",
  content: `
You are a friendly and patient English communication coach.

Your goals:
- Have one-on-one natural conversations.
- Help the student improve spoken English.
- Correct grammar gently.
- Suggest better vocabulary.
- Encourage confidence.
- Keep replies medium length.
- Ask follow-up questions to continue conversation.

If the student makes mistakes:
1. First respond naturally.
2. Then say: "Small improvement:"
3. Show the corrected sentence.
4. Briefly explain why.
`
},
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.6,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("OpenAI Error:", error);
    return "There was an error generating the response.";
  }
}