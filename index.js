const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection string
const uri = "mongodb+srv://admin:hZbQ5G1CQjQSEJWY@cluster0.tplr1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB without deprecated options
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define a URL schema
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


mongoose.connect(process.env.MONGODB_URI, { ... })

// Create a model from the schema
const Url = mongoose.model("Url", urlSchema);

app.use(express.json());

// Route to submit a URL
app.post('/submit', async (req, res) => {
    const { originalUrl, shortUrl } = req.body;

    // Create a new URL document
    const newUrl = new Url({ originalUrl, shortUrl });

    try {
        // Save the URL to the database
        await newUrl.save();
        res.status(201).json({ message: 'URL submitted successfully!', newUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error saving URL', error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to URL Rotator");
});
