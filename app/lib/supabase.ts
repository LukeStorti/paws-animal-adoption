import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

export const supabaseBrowser = () => {
  createBrowserClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
};
