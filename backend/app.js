import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", routes);

// Error handling middleware

// app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      error: err.errors.map((e) => e.message),
    });
  }

  // Handle other errors
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

export default app;
