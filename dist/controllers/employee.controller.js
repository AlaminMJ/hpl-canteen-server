"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const getAllEmployees = async (_req, res) => {
    const employees = await employee_model_1.default.find().populate('department');
    res.json(employees);
};
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    const employee = await employee_model_1.default.findById(id).populate('department');
    if (!employee)
        return res.status(404).json({ message: 'Not found' });
    res.json(employee);
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = async (req, res) => {
    const employee = await employee_model_1.default.create(req.body);
    res.status(201).json(employee);
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const updated = await employee_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated)
        return res.status(404).json({ message: 'Not found' });
    res.json(updated);
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    const deleted = await employee_model_1.default.findByIdAndDelete(id);
    if (!deleted)
        return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
};
exports.deleteEmployee = deleteEmployee;
