import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { UserRole } from "@prisma/client"
import { z } from "zod"

class SessionsController {
 async create(request: Request, response: Response) {
  // const bodySchema = z.object({
  //   name: z.string().trim().min(2, {message: 'O nome é obrigatório'}),
  //   email: z.string().trim().email({message: 'Email inválido'}).toLowerCase(),
  //   password: z.string().min(6, {message: 'Mínimo de 6 caracteres'}),
  //   role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
  // })

  response.status(201).json({message: 'Session controller ok'})
 }

}

export { SessionsController }