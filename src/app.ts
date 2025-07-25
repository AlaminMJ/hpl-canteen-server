import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import departmentRoute from "./routes/department.routes";
import employeeRoutes from "./routes/employee.routes";
import mealTypeRoutes from "./routes/mealType.routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: ".env" });
const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoute);
app.use("/api/employees", employeeRoutes);
app.use("/api/meal-types", mealTypeRoutes);
app.get("/health", (req, res) => {
  res.send("OK");
});
app.get("/", (req, res) => {
  res.send("Canteen");
});

export default app;
