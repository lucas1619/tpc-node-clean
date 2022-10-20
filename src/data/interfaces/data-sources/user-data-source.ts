import { User } from "../../../domain/entities/user";

export interface UserDataSource {
    create(user: User): Promise<User>
    findById(id: string): Promise<User>
}