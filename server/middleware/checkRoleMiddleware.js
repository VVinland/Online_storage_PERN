import jwt from 'jsonwebtoken'

export default function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                res.status(200).json({ message: 'Не авторизован' });
            }
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (decode.role !== role) {
                res.status(403).json({ message: 'Нет доступа' });
            }
            res.user = decode;
            next();
        } catch (err) {
            res.status(200).json({ message: 'Не авторизован' });
        }
    }
}