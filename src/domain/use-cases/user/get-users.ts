import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetAllUsersUseCase } from "../../interfaces/use-cases/user/get-users";


export class GetAllUsers implements GetAllUsersUseCase {
    
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(): Promise<User> {
        return await this.userRepository.findAll()
    }
}
