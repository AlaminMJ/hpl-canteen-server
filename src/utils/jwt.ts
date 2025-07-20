
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const generateAccessToken = (userId: any): string =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });

export const generateRefreshToken = (userId: any): string =>
  jwt.sign({ id: userId }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });

export const verifyToken = (token: string, secret: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;
