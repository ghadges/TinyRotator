import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { supabase } from "../lib/supabase-client";

export default function Home() {
  const [url, setUrl] = useState("");
  const [weight, setWeight] = useState("");
  const [links, setLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, weight: parseInt(weight) }),
      });
      const data = await response.json();
      alert(`Short link: ${data.shortLink}`);
      setLinks([...links, { url, weight }]);
      setUrl("");
      setWeight("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h3" gutterBottom style={{ color: "#6C63FF" }}>
        TinyRotator
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Weight (%)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "1rem", backgroundColor: "#6C63FF" }}
        >
          Add Link
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell align="right">Weight (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link, index) => (
              <TableRow key={index}>
                <TableCell>{link.url}</TableCell>
                <TableCell align="right">{link.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
