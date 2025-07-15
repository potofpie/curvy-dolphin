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

const requestSchemas = z.union([startPhoneLinkSchema, checkUsageSchema, checkForImageSchema]);

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

const checkForImage = async (
  data: z.infer<typeof checkForImageSchema>,
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext,
  userId: string
) => {
  const convertions = await ctx.objectstore.get('curvy-dolphin', `${userId}:${data.password}`);
  if (!convertions) {
    return resp.text('No convertions found');
  }
  
  return resp.json(convertions);
};

const router = (
  data: z.infer<typeof requestSchemas>,
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext,
  userId: string
) => {
  switch (data.action) {
    case 'startPhoneLink':
      return startPhoneLink(data, req, resp, ctx, userId);
    case 'checkUsage':
      return checkUsage(data, req, resp, ctx, userId);
    case 'checkForImage':
      return checkForImage(data, req, resp, ctx, userId);
  }
};

export default async function Agent(
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext
) {

  const parsedRequest = requestSchemas.safeParse(await req.data.json());
  if (!parsedRequest.success) {
    return resp.json({
      error: 'Invalid request',
      success: false
    });
  }

  if (!parsedRequest.data.token) {
    return resp.json({
      error: 'Invalid token',
      success: false
    });
  }
  
  const user = await clerkClient.verifyToken(parsedRequest.data.token);
  const userId = user.sub;

  const userData = await clerkClient.users.getUser(userId);

  if (!userData) {
    return resp.json({
      error: 'Invalid token',
      success: false
    });
  }

  if (!user) {
    return resp.json({
      error: 'Invalid token',
      success: false
    });
  }

  return router(parsedRequest.data, req, resp, ctx, userId);
}



