import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; 
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

