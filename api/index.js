const express = require("express");
const axios = require("axios");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json"); // path ke swagger.json

const app = express();
const BASE_URL = "https://ranobedb.org/api/v0";

/* ======================
   Root redirect ke Swagger UI
====================== */
app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

/* ======================
   Swagger UI route
====================== */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ======================
   API Routes (Wrapper RanobeDB)
====================== */

// GET /books?q=&page=&limit=&rl=
app.get("/books", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`, { params: req.query });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /book/:id
app.get("/book/:id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/book/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /series?q=&page=&limit=
app.get("/series", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/series`, { params: req.query });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /releases?minDate=&maxDate=&rl=
app.get("/releases", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/releases`, { params: req.query });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   Export untuk Vercel Serverless
====================== */
module.exports = app;
module.exports.config = {
  api: {
    bodyParser: false
  }
};
