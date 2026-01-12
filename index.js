const express = require("express");
const axios = require("axios");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const PORT = 3000;

const swaggerDocument = YAML.load("./swagger.yaml");
const BASE_URL = "https://ranobedb.org/api/v0";

/* ======================
   Swagger UI
====================== */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ======================
   API Routes (Wrapper)
====================== */

// GET /books
app.get("/books", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`, {
      params: req.query
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /book/:id
app.get("/book/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/book/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /series
app.get("/series", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/series`, {
      params: req.query
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /releases
app.get("/releases", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/releases`, {
      params: req.query
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   Start Server
====================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running`);
  console.log(`📘 Swagger UI: http://localhost:${PORT}/docs`);
});
