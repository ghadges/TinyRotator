import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [weight, setWeight] = useState("");
  const [links, setLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://tiny-rotator.vercel.app/", {
        url,
        weight: parseInt(weight),
      });
      alert(`Short link created: ${response.data.shortLink}`);
      setLinks([...links, { url, weight: parseInt(weight) }]);
      setUrl("");
      setWeight("");
    } catch (error) {
      console.error("Error adding link:", error);
      alert("Failed to create short link");
    }
  };

  return (
    <div className="App">
      <Typography variant="h3" className="title">
        TinyRotator
      </Typography>

      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Destination URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight (%)"
          variant="outlined"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className="submit-button"
        >
          Add Link
        </Button>
      </form>

      <TableContainer component={Paper} className="table-container">
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

export default App;
