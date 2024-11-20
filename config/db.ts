import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.dbURL ||
      "mongodb+srv://LegalMatterBD:tIwPqcNQAgkXiKYd@cluster0.udrxo.mongodb.net/LegalMatterDB";

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
