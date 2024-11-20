import http from "http";
import app from "./app";
import connectDB from "./config/db";
import "dotenv/config";
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const main = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start the server due to a DB connection error",
      error
    );
  }
};

main();
