const express = require("express");
const crypto = require("crypto");
const app = express();

// Fixed secret key (keep this private!)
const secretKey = "a9F3kLm2Zx7NqVwPdR0YbGhJtCeX";

// Generate daily key using HMAC SHA256 with fixed secretKey and today's date
function generateDailyKey() {
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-05-19"
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(today);
  return hmac.digest("hex").slice(0, 24);
}

app.get("/", (req, res) => {
  res.send("Welcome! Visit /key to get today's daily key.");
});

app.get("/key", (req, res) => {
  res.send(generateDailyKey());
});

// Replit sets the port in process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
