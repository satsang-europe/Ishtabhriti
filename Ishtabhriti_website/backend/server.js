import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/dbConn.js";
import authRoutes from "./routes/auth.route.js";
import donateRoutes from "./routes/donation.route.js";
import familyRoutes from "./routes/familymember.route.js";
// import loggedinRoutes from "./routes/loggedin.route.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/family", familyRoutes);
app.use("/donation", donateRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
