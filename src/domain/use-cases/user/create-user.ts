import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { CreateUserUseCase } from "../../interfaces/use-cases/user/create-user";
import bycrypt from 'bcrypt'

export class CreateUser implements CreateUserUseCase {
    
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(user: User): Promise<User> {
        const hashPassword = await bycrypt.hash(user.password, 10);
        user.password = hashPassword;
        return await this.userRepository.create(user)
    }
}
