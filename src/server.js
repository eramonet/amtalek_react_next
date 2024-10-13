// server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.all("*", async (req, res) => {
  const apiUrl = `https://amtalek.com/amtalekadmin/public/api/web${req.url}`;
  const response = await fetch(apiUrl, {
    method: req.method,
    headers: {
      ...req.headers,
      // يمكنك إضافة رؤوس إضافية هنا مثل Authorization
    },
    body: req.method === "POST" ? JSON.stringify(req.body) : null,
  });

  const data = await response.json();
  res.status(response.status).json(data);
});

app.listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}`);
});
