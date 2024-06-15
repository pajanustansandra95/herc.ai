const express = require('express');
const { Hercai } = require('hercai'); // Adjust import path as per your package structure

const app = express();
const port = process.env.PORT || 3000;

// Initialize Hercai instance
const herc = new Hercai(); // Optionally provide API key here

// Middleware to parse JSON bodies
app.use(express.json());

// Define your API endpoint for text generation
app.get('/api/gpt4', async (req, res) => {
    const { model, content } = req.query;

    try {
        const response = await herc.question({ model, content });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
