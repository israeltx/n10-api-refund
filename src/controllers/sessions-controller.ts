import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { UserRole } from "@prisma/client"
import { z } from "zod"

class SessionsController {
 async create(request: Request, response: Response) {
  const bodySchema = z.object({
    email: z.string().trim().email({message: 'Email inválido'}).toLowerCase(),
    password: z.string(),
  })

  const { email, password } = bodySchema.parse(request.body)

  response.status(201).json({email, password})
 }

}

export { SessionsController }