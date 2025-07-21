import { Request, Response } from "express";
import Department from "../models/department.model";

export const getAllDepartments = async (_req: Request, res: Response) => {
  const departments = await Department.find().sort({ name: 1 });
  res.json(departments);
};

export const createDepartment = async (req: Request, res: Response) => {
  const { name } = req.body;
  const exists = await Department.findOne({ name });
  if (exists)
    return res.status(400).json({ message: "Department already exists" });

  const department = await Department.create({ name });
  res.status(201).json(department);
};

export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const department = await Department.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (!department)
    return res.status(404).json({ message: "Department not found" });

  res.json(department);
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await Department.findByIdAndDelete(id);
  if (!department)
    return res.status(404).json({ message: "Department not found" });

  res.json({ message: "Deleted successfully" });
};
