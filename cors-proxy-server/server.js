const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw9FUYOlXpTRtwDwtN1nxxQ8ZOKsvgH0l41BK1gZhotI0eN3qsLDGxiop3z7gEgF-QKng/exec";

app.get("/", (req, res) => {
    res.send("CORS Proxy Server is running");
}
);
app.post("/send-questions", async (req, res) => {
    try {
        const response = await axios.post(GOOGLE_APPS_SCRIPT_URL, req.body, {
            headers: { "Content-Type": "application/json" }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error forwarding request:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
