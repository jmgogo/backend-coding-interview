import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { photos } from "./photos";

export const photographers = pgTable("photographers", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  profileUrl: text("profile_url").notNull(),
});

export const photographersRelations = relations(photographers, ({ many }) => ({
  photos: many(photos),
}));
