"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/departments', department_routes_1.default);
app.use('/api/employees', employee_routes_1.default);
exports.default = app;
