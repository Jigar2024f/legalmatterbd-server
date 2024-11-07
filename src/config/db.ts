import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb+srv://LegalMatterBD:tIwPqcNQAgkXiKYd@cluster0.udrxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
       
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
