import { Request, Response } from 'express';
import Employee from '../models/employee.model';

export const getAllEmployees = async (_req: Request, res: Response) => {
  const employees = await Employee.find().populate('department');
  res.json(employees);
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await Employee.findById(id).populate('department');
  if (!employee) return res.status(404).json({ message: 'Not found' });
  res.json(employee);
};

export const createEmployee = async (req: Request, res: Response) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Employee.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Employee.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
