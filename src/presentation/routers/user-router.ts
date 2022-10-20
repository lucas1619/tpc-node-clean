import { Router, Request, Response } from "express"

import { CreateUserUseCase } from "../../domain/interfaces/use-cases/user/create-user"
import { GetAllUsersUseCase } from "../../domain/interfaces/use-cases/user/get-users"


export default function userRouter(createUserUseCase: CreateUserUseCase,getAllUsersUseCase: GetAllUsersUseCase) {
    const router = Router()

    router.post("/", async (req: Request, res: Response) => {
        try {
            const user = await createUserUseCase.execute(req.body)
            res.status(201).json(user)
        } catch (err: any) {
            if(err.code) {
                res.status(err.code).json({ message: err })
                return
            }
            res.status(500).json(err)
        }
    })

    router.get("/", async (req: Request, res: Response) => {
        try {
            const _arr_users = await getAllUsersUseCase.execute()
            res.status(201).json(_arr_users)
        } catch (err: any) {
            if(err.code) {
                res.status(err.code).json({ message: err })
                return
            }
            res.status(500).json(err)
        }
    })

    return router
}