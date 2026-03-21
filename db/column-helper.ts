import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const id = text("id")
  .primaryKey()
  .$defaultFn(() => nanoid(10));

export const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
};