import { Request, Response } from "express";
import MealType from "../models/mealType";

export const getAllMealTypes = async (_req: Request, res: Response) => {
  const meals = await MealType.find();
  res.json(meals);
};

export const getMealTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meal = await MealType.findById(id);
  if (!meal) return res.status(404).json({ message: "Meal type not found" });
  res.json(meal);
};

export const createMealType = async (req: Request, res: Response) => {
  const meal = await MealType.create(req.body);
  res.status(201).json(meal);
};

export const updateMealType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await MealType.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Meal type not found" });
  res.json(updated);
};

export const deleteMealType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await MealType.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Meal type not found" });
  res.json({ message: "Meal type deleted" });
};
