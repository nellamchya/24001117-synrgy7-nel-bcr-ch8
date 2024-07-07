import { Response, NextFunction } from 'express';
import { UserMiddlewareRequest } from '../../types';

export function allowAccess(allowedRoles: string[]) {
    return (req: UserMiddlewareRequest, res: Response, next: NextFunction) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You don't have enough permissions"
            });
        }
        next();
    };
}
