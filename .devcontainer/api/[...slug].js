import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { slug } = req.query;
  const shortCode = slug[0];

  const { data: links, error } = await supabase
    .from("links")
    .select("url, weight");

  const totalWeight = links.reduce((acc, link) => acc + link.weight, 0);
  const random = Math.random() * totalWeight;
  let cumulative = 0;

  for (const link of links) {
    cumulative += link.weight;
    if (random <= cumulative) {
      return res.redirect(link.url);
    }
  }

  res.status(404).json({ error: "No links found" });
}
