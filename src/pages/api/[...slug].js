import { supabase } from "../../lib/supabase-client";

export default async function handler(req, res) {
  const { slug } = req.query;
  const shortCode = slug[0];

  const { data: links, error } = await supabase
    .from("links")
    .select("url, weight");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

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
