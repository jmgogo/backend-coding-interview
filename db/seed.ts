import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { photos, photographers } from "./schema";
import { z } from "zod";
import { db, client } from "@/db/connect";

export const photoRowSchema = z.object({
  id: z.coerce.number(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  url: z.string().url(),
  photographer: z.string(),
  photographer_url: z.string().url(),
  photographer_id: z.coerce.number(),
  avg_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  alt: z.string().optional(),
  "src.original": z.string().url(),
  "src.large2x": z.string().url(),
  "src.large": z.string().url(),
  "src.medium": z.string().url(),
  "src.small": z.string().url(),
  "src.portrait": z.string().url(),
  "src.landscape": z.string().url(),
  "src.tiny": z.string().url(),
});

async function seed() {
  const csvContent = readFileSync("photos.csv", "utf-8");

  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  const parsedPhotos = z.array(photoRowSchema).parse(records);

  // Deduplicate photographers by id
  const photographerMap = new Map<number, typeof photographers.$inferInsert>();
  for (const row of parsedPhotos) {
    const id = Number(row["photographer_id"]);
    if (!photographerMap.has(id)) {
      photographerMap.set(id, {
        id,
        name: row["photographer"],
        profileUrl: row["photographer_url"],
      });
    }
  }

  const photographerRows = [...photographerMap.values()];

  console.log(`Seeding ${photographerRows.length} photographers...`);
  await db.insert(photographers).values(photographerRows).onConflictDoNothing();

  const photoRows: (typeof photos.$inferInsert)[] = records.map((row: any) => ({
    id: Number(row["id"]),
    width: Number(row["width"]),
    height: Number(row["height"]),
    url: row["url"],
    photographerId: Number(row["photographer_id"]),
    avgColor: row["avg_color"],
    alt: row["alt"] || null,
    srcOriginal: row["src.original"],
    srcLarge2x: row["src.large2x"],
    srcLarge: row["src.large"],
    srcMedium: row["src.medium"],
    srcSmall: row["src.small"],
    srcPortrait: row["src.portrait"],
    srcLandscape: row["src.landscape"],
    srcTiny: row["src.tiny"],
  }));

  console.log(`Seeding ${photoRows.length} photos...`);
  await db.insert(photos).values(photoRows).onConflictDoNothing();

  console.log("Seed complete!");
  await client.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
