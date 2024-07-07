import { MaybeCompositeId } from "objection";
import {
    CarCondition,
    Cars,
    CarsModel,
    CreateCarInput,
    DeleteCarInput,
} from '../../types';


export default new class CarRepository {
    async create(data: CreateCarInput): Promise<CreateCarInput> {
        return await CarsModel.query().insert(data);
    }

    async update(id: MaybeCompositeId, updateArgs: Cars) {
        return CarsModel.query()
            .where({ id })
            .patch(updateArgs)
            .throwIfNotFound()
            .returning("*");
    }

    async delete(id: MaybeCompositeId, updateArgs: DeleteCarInput) {
        return CarsModel.query()
            .where({ id })
            .patch(updateArgs)
            .throwIfNotFound()
            .returning("*");
    }

    async findAll(conditionArgs: CarCondition) {
        const { driver_type, available_at, capacity, available } = conditionArgs;
        let query = CarsModel.query()
        if (driver_type !== undefined) {
            query = query.where('driver_type', driver_type);
        }

        if (available_at !== undefined) {
            query = query.where('available_at', '>=', available_at);
        }

        if (available !== undefined) {
            query = query.where('available', available);
        }

        if (capacity !== undefined) {
            query = query.where('capacity', '>=', capacity);
        }

        const [total, data] = await Promise.all([
            query.resultSize(),
            query.select(),
        ]);

        return {
            data,
            total,
            error: false,
        }
    }

    async findById(id: MaybeCompositeId) {
        return CarsModel.query().findById(id).select()
            .throwIfNotFound();
    }
}