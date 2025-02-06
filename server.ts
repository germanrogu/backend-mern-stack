import app from "./app";
import dotenv from "dotenv";
import connectDB from "./src/config/db";

dotenv.config();
//Conecta a MongoDB antes de levantar el servidor.
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
