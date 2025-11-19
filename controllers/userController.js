import userModel from '../models/userModel.js';

class userController {
    constructor () {}

    async getAll(req, res) {
        try {
            const users = await userModel.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userModel.getUserById(id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userModel.updateUser(id, req.body);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userModel.deleteUser(id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ msg: "User deleted" });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

export default new userController();
