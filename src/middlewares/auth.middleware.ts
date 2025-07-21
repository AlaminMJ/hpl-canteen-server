import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserDoc } from "../models/user.model";

interface JwtPayload {
  id: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "No token" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id);
    console.log(user);
    if (!user || user.status !== "active") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions = roles.some((r: string) => req.user.roles === r);
    if (!permissions)
      return res.status(403).json({ message: "Permission denied" });
    next();
  };
};
