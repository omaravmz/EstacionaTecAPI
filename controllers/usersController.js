import usersModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';

class usersController {
    constructor () {}

    async register(req, res){
        try {
            const { email, name, password} = req.body;

            const userExist = await usersModel.getUser( { email } );
            if (userExist) {
                return res.status(400).json({error: 'User exists'});
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);

            const data = await usersModel.addUser({
                email,
                name,
                password: hashedPassword
            });

            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async login(req, res){
        const { email, password } = req.body;
        
        const userExist = await usersModel.getUser( { email } );
            if (!userExist) {
                return res.status(400).json({error: 'User does not exist'});
            }

            const validPassword = await bcrypt.compare(password, userExist.password);

            if (!validPassword) {
                return res.status(400).json({error: 'Invalid Password'});
            }

            return res.status(200).json({msg: 'Valid User'});
    }

}

export default new usersController();