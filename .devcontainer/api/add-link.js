import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { url, weight } = req.body;
  const shortCode = Math.random().toString(36).substring(2, 8);

  const { data, error } = await supabase
    .from("links")
    .insert([{ url, weight, short_code: shortCode }]);

  if (error) return res.status(500).json({ error: error.message });
  res
    .status(200)
    .json({ shortLink: `https://tiny-rotator.vercel.app/${shortCode}` });
}
