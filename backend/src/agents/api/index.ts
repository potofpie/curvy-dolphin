import type { AgentContext, AgentRequest, AgentResponse } from '@agentuity/sdk';
import { z } from 'zod';
import diceware from 'diceware';
import { clerkClient } from '@clerk/clerk-sdk-node';

const startPhoneLinkSchema = z.object({
  action: z.literal('startPhoneLink'),
  token: z.string(),
});

const checkUsageSchema = z.object({
  action: z.literal('checkUsage'),
  token: z.string(),
});

const checkForImageSchema = z.object({
  action: z.literal('checkForImage'),
  token: z.string(),
  password: z.string(),
});

const sendImageFromPhoneSchema = z.object({
  action: z.literal('sendImageFromPhone'),
  image: z.string(),
  password: z.string(),
});

const privateRequestSchemas = z.union([startPhoneLinkSchema, checkUsageSchema, checkForImageSchema]);

const requestSchemas = z.union([privateRequestSchemas, sendImageFromPhoneSchema]);

const startPhoneLink = (
  data: z.infer<typeof startPhoneLinkSchema>,
  _req: AgentRequest,
  resp: AgentResponse,
  _ctx: AgentContext,
  userId: string
) => {
    const password = diceware(3);
    const passwordString = Array.isArray(password) ? password.join('-') : password.split(' ').join('-');
    return resp.json({
      password: passwordString
    });
};
const checkUsage = async (
  data: z.infer<typeof checkUsageSchema>,
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext,
  userId: string
) => {
  const convertions = await ctx.kv.get('curvy-dolphin', userId);
  if (!convertions) {
    return resp.text('No convertions found');
  }
  return resp.json(convertions);
};

const sendImageFromPhone = async (  
  data: z.infer<typeof sendImageFromPhoneSchema>,
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext
) => {
  const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
  const imgBuffer = Buffer.from(base64Data, 'base64');
  await ctx.objectstore.put('curvy-dolphin', `${data.password}`, imgBuffer);
  return resp.json({
    success: true
  });
};

const checkForImage = async (
  data: z.infer<typeof checkForImageSchema>,
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext,
  userId: string
) => {
  const convertions = await ctx.objectstore.get('curvy-dolphin', data.password);
  const base64 = await convertions.data.base64();

  return resp.json({
    image: `data:image/jpeg;base64,${base64}`
  });
};

const checkToken = async (  
  data: z.infer<typeof privateRequestSchemas>,
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext
) => {
  if (!data.token) {
    throw new Error('Invalid token');
  }
  
  const user = await clerkClient.verifyToken(data.token);
  const userId = user.sub;

  const userData = await clerkClient.users.getUser(userId);

  if (!userData) {
    throw new Error('Invalid token');
  }

  return userId;
}

const router = async (
  data: z.infer<typeof requestSchemas>,
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext,
) => {
  switch (data.action) {
    case 'startPhoneLink': {
      const userId = await checkToken(data, req, resp, ctx);
      return startPhoneLink(data, req, resp, ctx, userId);
    }
    case 'checkUsage': {
      const userId = await checkToken(data, req, resp, ctx);
      return checkUsage(data, req, resp, ctx, userId);
    }
    case 'checkForImage': {
      const userId = await checkToken(data, req, resp, ctx);
      return checkForImage(data, req, resp, ctx, userId);
    }
    case 'sendImageFromPhone':{
      console.log('sendImageFromPhone');
      return sendImageFromPhone(data, req, resp, ctx);
    }
  }
};

export default async function Agent(
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext
) {

  const parsedRequest = requestSchemas.safeParse(await req.data.json());

  console.log(parsedRequest);

  if (!parsedRequest.success) {
    return resp.json({
      error: 'Invalid request',
      success: false
    });
  }
  const result = await router(parsedRequest.data, req, resp, ctx);
  console.log(result);
  return result;
}



