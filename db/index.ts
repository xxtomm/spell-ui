import { drizzle } from "drizzle-orm/libsql/web";
import * as authSchema from "./schemas/auth";

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: {
    ...authSchema,
  },
});
