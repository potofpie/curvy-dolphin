import type { AgentContext, AgentRequest, AgentResponse } from '@agentuity/sdk';
import OpenAI from 'openai';

const client = new OpenAI();

export const welcome = () => {
  return {
    welcome:
      'Welcome to the OpenAI TypeScript Agent! I can help you build AI-powered applications using OpenAI models.',
    prompts: [
      {
        data: 'How do I implement streaming responses with OpenAI models?',
        contentType: 'text/plain',
      },
      {
        data: 'What are the best practices for prompt engineering with OpenAI?',
        contentType: 'text/plain',
      },
    ],
  };
};

export default async function Agent(
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext
) {
  try {
    const data = await req.data.json();
    const { userId, token, image } = data as { userId: string; token: string; image: string };
    if (!userId || !token || !image) {
      return resp.text('Missing userId, token, or image');
    }

    // Compose the prompt for markdown conversion
    const prompt =
      'Convert the content of this image to markdown. If it is handwritten notes, preserve structure and headings.';

    // Send the image to OpenAI GPT-4o with vision
    const result = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'image_url',
              image_url: {
                url: image, // expects data:image/jpeg;base64,...
              },
            },
          ],
        },
      ],
      max_tokens: 2048,
      response_format: { type: 'text' },
    });

    return resp.text(result.choices[0]?.message.content ?? 'No markdown result');
  } catch (error) {
    ctx.logger.error('Error running agent:', error);
    return resp.text('Sorry, there was an error processing your request.');
  }
}
