import { UserDataSource } from "../../data/interfaces/data-sources/user-data-source";
import { User } from "../entities/user";
import { UserRepository } from "../interfaces/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
    private userDataSource: UserDataSource
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }
    public async create(user: User): Promise<User> {
        try {
            return await this.userDataSource.create(user)
        } catch (error) {
            throw error
        }
    }
    public async findById(id: string): Promise<User> {
        return await this.userDataSource.findById(id)
    }
}