import { supabase } from "../../../lib/supabase-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, weight } = req.body;
  const shortCode = Math.random().toString(36).substring(2, 8);

  const { data, error } = await supabase
    .from("links")
    .insert([{ url, weight, short_code: shortCode }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({
    shortLink: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${shortCode}`,
  });
}
