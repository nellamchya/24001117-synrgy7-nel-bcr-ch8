import userRepository from "../repositories/userRepository";
import {
    Users
} from '../../types';

export default new class UserService {
    async checkDuplicate(email: string): Promise<boolean> {
        return await userRepository.checkDuplicate(email);
    }
    
    async create(data: Users): Promise<Users> {
        return await userRepository.create(data);
    }
    
    async update(id: string | number, updateArgs: Users): Promise<Users> {
        const updatedUsers = await userRepository.update(id, updateArgs);
        return updatedUsers[0];
    }

    async delete(id: string | number): Promise<Users> {
        return userRepository.delete(id);
    }

    async findAll(conditionArgs: Users): Promise<{ data: Users[], total: number }> {
        return userRepository.findAll(conditionArgs);
    }

    async findByEmail(email: string): Promise<Users> {
        return userRepository.findByEmail(email);
    }

    async findById(id: string | number): Promise<Users> {
        return userRepository.findById(id);
    }
}
