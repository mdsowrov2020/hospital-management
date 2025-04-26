import dotenv from "dotenv";
dotenv.config();
import { connection, sequelize } from "./db/db.js";
import app from "./app.js";

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connection();

    await sequelize.sync({ alter: true });

    app.listen(port, () => {
      console.log(`Server connected on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
