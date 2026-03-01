import { reset } from "drizzle-seed";
import { db, client } from "@/db/connect";
import * as schema from "./schema";

export async function clearDatabase() {
  console.log("🧹 Clearing database records...");
  await reset(db, schema);
}

if (require.main == module)
  (async () => {
    await clearDatabase();
    await client.end();
  })();
