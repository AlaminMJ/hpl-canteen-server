import { Request, Response } from "express";
import MealConsumption from "../models/mealConsumption.model";
import MealType from "../models/mealType";

const canCreateRecord = (mealType: any, date: Date, userRole: string) => {
  if (userRole === "admin") return true;

  // Parse lastRequisition time from MealType
  const [hr, min] = mealType.lastRequisition.split(":").map(Number);
  const lastReqDateTime = new Date(date);
  lastReqDateTime.setHours(hr, min, 0, 0);

  return new Date() < lastReqDateTime;
};

export const createMealConsumption = async (req: Request, res: Response) => {
  const {
    employee_Id,
    meal_type,
    date,
    status = "Pending",
    deviceinfo,
  } = req.body;

  const mealType = await MealType.findById(meal_type);
  if (!mealType)
    return res.status(404).json({ message: "Meal Type not found" });

  //   if (!canCreateRecord(mealType, new Date(date), userRole)) {
  //     return res.status(400).json({ message: `Cannot create record after last requisition time (${mealType.lastRequisition})` });
  //   }

  try {
    const record = await MealConsumption.create({
      employee_Id,
      meal_type,
      date: new Date(date),
      status,
      deviceinfo,
    });
    res.status(201).json(record);
  } catch (err: any) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({
          message: "Duplicate record exists for this employee, meal, and date",
        });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
