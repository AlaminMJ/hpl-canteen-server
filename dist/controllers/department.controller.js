"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.createDepartment = exports.getAllDepartments = void 0;
const department_model_1 = __importDefault(require("../models/department.model"));
const getAllDepartments = async (_req, res) => {
    const departments = await department_model_1.default.find().sort({ name: 1 });
    res.json(departments);
};
exports.getAllDepartments = getAllDepartments;
const createDepartment = async (req, res) => {
    const { name } = req.body;
    const exists = await department_model_1.default.findOne({ name });
    if (exists)
        return res.status(400).json({ message: 'Department already exists' });
    const department = await department_model_1.default.create({ name });
    res.status(201).json(department);
};
exports.createDepartment = createDepartment;
const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const department = await department_model_1.default.findByIdAndUpdate(id, { name }, { new: true });
    if (!department)
        return res.status(404).json({ message: 'Department not found' });
    res.json(department);
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    const department = await department_model_1.default.findByIdAndDelete(id);
    if (!department)
        return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Deleted successfully' });
};
exports.deleteDepartment = deleteDepartment;
