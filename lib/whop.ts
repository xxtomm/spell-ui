import Whop from "@whop/sdk";

export const whop =
  process.env.WHOP_WEBHOOK_SECRET && process.env.WHOP_API_KEY
    ? new Whop({
        apiKey: process.env.WHOP_API_KEY,
        webhookKey: process.env.WHOP_WEBHOOK_SECRET,
      })
    : null;
