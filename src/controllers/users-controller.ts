import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { UserRole } from "@prisma/client"
import { hash } from "bcrypt"
import { z } from "zod"

class UsersController {
 async create(request: Request, response: Response) {
  const bodySchema = z.object({
    name: z.string().trim().min(2, {message: 'O nome é obrigatório'}),
    email: z.string().trim().email({message: 'Email inválido'}).toLowerCase(),
    password: z.string().min(6, {message: 'Mínimo de 6 caracteres'}),
    role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
  })

  const {name, email, password, role} = bodySchema.parse(request.body)

  const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

  if (userWithSameEmail) {
    throw new AppError('Email já existe')
  }

  const hashedPassword = await hash(password, 8)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    }
  })

  response.status(201).json()
 }

}

export { UsersController }