import { Connection } from "mysql"
import { User } from "../../../domain/entities/user"
import { UserDataSource } from "../../interfaces/data-sources/user-data-source"
export class MysqlUserDataSource implements UserDataSource {
    private databaseConnection: Connection
    constructor(databaseConnection: Connection) {
        this.databaseConnection = databaseConnection
    }
    public async create(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.databaseConnection.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [user.name, user.email, user.password],
                (error, _results) => {
                    if (error) {
                        if(error.code === 'ER_DUP_ENTRY'){
                            reject({
                                code: 400,
                                message: `Duplicated ${user.email}!`
                            })
                        }
                        reject(error)
                    } else {
                        resolve(user)
                    }
                }
            )
        })   
    }

    public async findById(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.databaseConnection.query(
                "SELECT * FROM users WHERE id = ?",
                [id],
                (error, results) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(results[0])
                    }
                }
            )
        })
    }

    public async findAll():Promise<User>{
        return new Promise((resolve,reject)=>{
            this.databaseConnection.query(
                "SELECT * FROM users",
                [],
                (error,results)=>{
                    if(error){
                        reject(error)
                    } else{
                        resolve(results)
                    }
                }
            )
        })
    }
}