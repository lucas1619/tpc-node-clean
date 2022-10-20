import server from "./server"
import userRouter from "./presentation/routers/user-router"
import mysql from "mysql"

import { CreateUser } from "./domain/use-cases/user/create-user"
import { UserRepositoryImpl } from "./domain/repositories/user-repository"
import { MysqlUserDataSource } from "./data/data-sources/mysql/mysql-user-data-source"


const PORT = 3000
const prefixV1 = "/api/v1"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tpc_db',
    port: 3306,
});

connection.connect(error => {
    if (!!error) {
        console.log('Error')
    } else {
        console.log('Connected')
        const userMiddleware = userRouter(
            new CreateUser(new UserRepositoryImpl(new MysqlUserDataSource(connection)))
        )
        server.use(`${prefixV1}/users`, userMiddleware)
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    }
});
