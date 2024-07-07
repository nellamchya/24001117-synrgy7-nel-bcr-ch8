import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UsersModel } from '../models/users';
import { UserAuthorizationRequest} from '../../types';

export async function authorize(req: UserAuthorizationRequest, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;
        
        if (!bearerToken) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = bearerToken.split("Bearer ")[1]; // Ensure bearerToken is defined
        const secret: string = process.env.JWT_SECRET ?? "secret";
        const tokenPayload = jwt.verify(token, secret) as jwt.JwtPayload;

        const userRecord = await UsersModel.query().findOne({ id: tokenPayload.id }).select('id', 'email', 'nama', 'role', 'created_at', 'updated_at');

        if (userRecord) {
            req.user = {
                id: userRecord.id.toString(),
                email: userRecord.email,
                nama: userRecord.nama,
                role: userRecord.role,
                created_at: userRecord.created_at.toString(),
                updated_at: userRecord.updated_at.toString()
            };
        } else {
            throw new Error("User not found");
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}
