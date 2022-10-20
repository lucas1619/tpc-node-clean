import { Router, Request, Response } from "express"

import { CreateUserUseCase } from "../../domain/interfaces/use-cases/user/create-user"

export default function userRouter(createUserUseCase: CreateUserUseCase) {
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

    return router
}