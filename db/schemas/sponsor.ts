import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { id, timestamps } from "../column-helper";
import { users } from "./auth";

export const sponsors = sqliteTable(
  "sponsors",
  {
    id,
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tierId: text("tier_id").notNull(),
    whopPaymentId: text("whop_payment_id").notNull().unique(),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull(),
    status: text("status").notNull().default("active"),
    logoUrl: text("logo_url"),
    logoDarkUrl: text("logo_dark_url"),
    websiteUrl: text("website_url"),
    ...timestamps,
  },
  (table) => [
    index("sponsors_userId_idx").on(table.userId),
    index("sponsors_whopPaymentId_idx").on(table.whopPaymentId),
  ],
);

export const sponsorsRelations = relations(sponsors, ({ one }) => ({
  user: one(users, {
    fields: [sponsors.userId],
    references: [users.id],
  }),
}));
