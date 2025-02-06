import mongoose from "mongoose";

/**
 *Conexión a MongoDB con process.env.MONGO_URI
 *Si falla, detiene la aplicación (process.exit(1)).
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
