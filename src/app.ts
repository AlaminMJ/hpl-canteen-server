import express from 'express';
import authRoutes from './routes/auth.routes';
import departmentRoute from './routes/department.routes';
import employeeRoutes from './routes/employee.routes';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoute);
app.use('/api/employees', employeeRoutes);
app.get("/health",(req,res)=>{
    res.send("OK");
})

export default app;
