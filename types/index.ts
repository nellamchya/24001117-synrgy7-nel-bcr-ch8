// Library
import { Request } from "express";
import { Readable } from "stream";

// import all the models
import { Cars as Car, CarsModel } from "../app/models/cars";
import { Users as TypeUser, UsersModel } from "../app/models/users";

export type Cars = Car;
export {
    CarsModel,
    UsersModel,
};

// Import Create and Delete Input
export type Users = TypeUser;
export type CreateCarInput = Omit<Cars, 'created_at' | 'updated_at'>;
export type DeleteCarInput = Pick<Cars, 'available' | 'updated_by'>;


// Middleware
export interface User {
    role: string;
    id: number;
}

export interface UserMiddlewareRequest extends Request {
    user: User;
}

import { cloudinary } from "../app/middleware/cloudinary";
export type Cloudinary = typeof cloudinary;

interface Multer {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
    stream: Readable;
}

export type MulterFile = Multer;

// User
export interface UserAuthorization {
    id: string;
    email: string;
    nama: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface UserAuthorizationRequest extends Request {
    user ?: UserAuthorization;
}

// Cars
export interface CarBody {
    id?: string;
    image?: string;
    plate: string;
    manufacture: string;
    model: string;
    capacity: number;
    description: string;
    transmission: string;
    type: string;
    year: string;
    options: string[];
    driver_type: boolean;
    rent_per_day: number;
    available_at: Date;
    specs: string[];
    photo?: string;
    available?: boolean;
    updated_by?: number;
    created_by?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface CarParams {
    id: string;
}

export interface CarQuery {
    driver: string,
    date: string,
    time: string,
    capacity: number
}

export interface CarCondition {
    driver_type?: number,
    available_at?: Date,
    capacity?: number,
    available?: boolean,
}

export interface CarByIdRequest extends Request<CarParams> {
    user?: User;
}

export interface DataRequest extends Request<CarParams> {
    body: CarBody;
    file?: MulterFile;
    user?: User;
}

export type AllCarRequest = Request<Record<string, never>, Record<string, never>, Record<string, never>, CarQuery>;
