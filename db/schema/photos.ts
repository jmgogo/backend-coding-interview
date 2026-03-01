import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { photographers } from "./photographers";

export const photos = pgTable("photos", {
  id: integer("id").primaryKey(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  url: text("url").notNull(),
  photographerId: integer("photographer_id")
    .notNull()
    .references(() => photographers.id),
  avgColor: varchar("avg_color", { length: 7 }).notNull(),
  alt: text("alt"),

  // src variants
  srcOriginal: text("src_original").notNull(),
  srcLarge2x: text("src_large2x").notNull(),
  srcLarge: text("src_large").notNull(),
  srcMedium: text("src_medium").notNull(),
  srcSmall: text("src_small").notNull(),
  srcPortrait: text("src_portrait").notNull(),
  srcLandscape: text("src_landscape").notNull(),
  srcTiny: text("src_tiny").notNull(),
});

export const photosRelations = relations(photos, ({ one }) => ({
  photographer: one(photographers, {
    fields: [photos.photographerId],
    references: [photographers.id],
  }),
}));
