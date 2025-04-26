import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
// app.use('/api', routes);

// Error handling middleware
// app.use(errorHandler);

export default app;
