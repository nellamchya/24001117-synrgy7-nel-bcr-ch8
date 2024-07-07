import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const salt = 10;

interface TokenPayload {
    id: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
}

// register
export async function encryptPassword(password: string) {
    const result = await bcrypt.hash(password, salt)
    return result;

}

// login
export async function checkPassword(encryptedPassword: string, password: string) {
    const result = await bcrypt.compare(password, encryptedPassword)
    return result
}

export async function createToken(payload: TokenPayload) {
    const secret: string = process.env.JWT_SECRET ?? "secret"
    return jwt.sign(payload, secret, {
        expiresIn: '1800s'
    })
}