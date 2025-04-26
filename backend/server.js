const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});
