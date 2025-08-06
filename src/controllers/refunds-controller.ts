import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
// import { authConfig } from "@/configs/auth"
import { prisma } from "@/database/prisma"
// import { sign } from "jsonwebtoken"
// import { compare } from "bcrypt"
import { z } from "zod"

const CategoriesEnum = z.enum(['food', 'others', 'services', 'transport', 'accommodation'])

class RefundsController {
 async create(request: Request, response: Response) {
  const bodySchema = z.object({
    name: z.string().trim().min(1, {message: 'Informe o nome da solicitação'}),
    category: CategoriesEnum,
    amount: z.number().positive({message: 'O número precisa ser positivo'}),
    filename: z.string().min(20)
  })

  const {name, category, amount, filename} = bodySchema.parse(request.body)

  if (!request.user?.id) {
    throw new AppError('Usuário não autorizado', 401)
  }

  const refund = await prisma.refunds.create({
    data: {
      name,
      category, 
      amount,
      filename,
      userId: request.user.id
    }
  })

  response.status(201).json(refund)
 }

 async index(request: Request, response: Response) {
  response.json({message: 'Session index ok'})
 }

}

export { RefundsController }