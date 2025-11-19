import { verifyToken } from "../config/jwt.js";
import userModel from "../models/userModel.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        next(); 
    } catch (error) {
        res.status(500).json({ error: "Server error validating admin role." });
    }
};
