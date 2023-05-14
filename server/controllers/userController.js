import bctrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from './../error/ApiError.js';
import { User, Basket } from './../models/models.js';
import dotenv from 'dotenv';
dotenv.config();

const generateJWT = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Емаил или пароль не были введены'));
        }
        const condidate = await User.findOne({ where: { email } });
        if (condidate) {
            return next(ApiError.badRequest('Пользоваетль с таким емаилом уже зарегистрирован'));
        }
        const hashPassword = await bctrypt.hash(password, 5);
        const user = await User.create({ email, password: hashPassword, role });
        const basket = await Basket.create({ userId: user.id })
        const token = generateJWT(user.id, user.email, user.role);

        return res.json({ token });
    }

    async login(req, res, next) {

        const { email, password } = req.body;
        const user = await User.findOne({where:{email}});
        if(!user){
            return next(ApiError.internal('Пользователя с таким емаилом нет'));
        }
        const compranePass = bctrypt.compareSync(password, user.password);
        if(!compranePass){
            return next(ApiError.internal('Не верный пароль'));
        }
        const token = generateJWT(user.id,user.email,user.role);

        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJWT(req.id,req.email,req.role);
        return res.json({token});
    }       
}

export default new UserController();