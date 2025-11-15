import usersModel from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/jwt.js';

class authController {

    constructor() {}

    async register(req, res) {
        try {
            const { email, name, password, role } = req.body;

            if (!email || !name || !password) {
                return res.status(400).json({ error: "Missing fields" });
            }

            const userExist = await usersModel.getUser({ email });
            if (userExist) {
                return res.status(400).json({ error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await usersModel.addUser({
                email,
                name,
                password: hashedPassword,
                role: role || "user"
            });

            return res.status(201).json({
                msg: "User registered successfully",
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role
                }
            });

        } catch (error) {
            console.error("Register error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Missing fields" });
            }

            const user = await usersModel.getUser({ email });
            if (!user) {
                return res.status(400).json({ error: "User does not exist" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: "Invalid password" });
            }

            const payload = {
                id: user._id,
                email: user.email,
                role: user.role
            };

            const token = generateToken(payload);

            return res.status(200).json({
                msg: "Login successful",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

}

export default new authController();
