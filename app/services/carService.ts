import carRepository from "../repositories/carRepository";
import { cloudinary } from "../middleware/cloudinary";
import {
    Cars,
    CarCondition,
    CreateCarInput,
    DeleteCarInput,
    MulterFile,
}
    from '../../types';

export default new class CarService {
    async create(data: CreateCarInput): Promise<CreateCarInput> {
        return await carRepository.create(data);
    }

    async update(id: string, updateArgs: Cars) {
        return carRepository.update(id, updateArgs);
    }

    async delete(id: string, updateArgs: DeleteCarInput) {
        return carRepository.delete(id, updateArgs);
    }

    async findAll(conditionArgs: CarCondition) {
        return carRepository.findAll(conditionArgs);
    }

    async findById(id: string) {
        return carRepository.findById(id);
    }

    async upload(file: MulterFile) {
        const fileBase64 = file?.buffer.toString("base64")
        const fileString = `data:${file?.mimetype};base64,${fileBase64}`
        const result = await cloudinary.uploader.upload(fileString)
        return result
    }
}