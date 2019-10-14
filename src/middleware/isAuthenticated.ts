import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.locals.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        res.locals.isAuth = false;
        return next();
    }
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretkey');
    } catch (err) {
        res.locals.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        res.locals.isAuth = false;
        return next();
    }
    res.locals.isAuth = true;

    if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('userId')) {
        res.locals.userId = decodedToken.userId;
    }
    next();
};

export default isAuthenticated;
