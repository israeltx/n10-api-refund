import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { UserRole } from "@prisma/client"
import { compare } from "bcrypt"
import { z } from "zod"

class SessionsController {
 async create(request: Request, response: Response) {
  const bodySchema = z.object({
    email: z.string().trim().email({message: 'Email inválido'}).toLowerCase(),
    password: z.string(),
  })

  const { email, password } = bodySchema.parse(request.body)

  const user = await prisma.user.findFirst({where:{email}})

  if (!user) {
    throw new AppError('Email ou senha inválidos', 401)
  }

  const passwordMatched = await compare(password, user.password)

  if (!passwordMatched) {
    throw new AppError('Email ou senha inválidos', 401)
  }

  response.status(201).json({email, password})
 }

}

export { SessionsController }