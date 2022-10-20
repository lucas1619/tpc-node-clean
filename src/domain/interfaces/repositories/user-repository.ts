import { User } from "../../entities/user"

export interface UserRepository {
    create(user: User): Promise<User>
    findById(id: string): Promise<User>
}