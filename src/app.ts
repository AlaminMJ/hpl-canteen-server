import express from "express";
import authRoutes from "./routes/auth.routes";
import departmentRoute from "./routes/department.routes";
import employeeRoutes from "./routes/employee.routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: ".env" });
const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoute);
app.use("/api/employees", employeeRoutes);
app.get("/health", (req, res) => {
  res.send("OK");
});
app.get("/", (req, res) => {
  res.send("Canteen");
});

export default app;

// import mealTypeRoutes from './routes/mealType.routes';
// app.use('/api/meal-types', mealTypeRoutes);
