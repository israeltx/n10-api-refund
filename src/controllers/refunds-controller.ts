import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { authConfig } from "@/configs/auth"
import { prisma } from "@/database/prisma"
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { z } from "zod"

class RefundsController {
 async create(request: Request, response: Response) {
  // const bodySchema = z.object({
  //   email: z.string().trim().email({message: 'Email inválido'}).toLowerCase(),
  //   password: z.string(),
  // })

  response.status(201).json({message: 'Session Controller ok'})
 }

}

export { RefundsController }