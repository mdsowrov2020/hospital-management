require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send(`Database host: ${process.env.DB_HOST}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
