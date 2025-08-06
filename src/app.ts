import express from "express";
import cors from "cors"
import { errorHandling } from "./middlewares/error-handling";
import { AppError } from "./utils/AppError";
import { z } from "zod"

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  const bodySchema = z.object({
    age: z.number().min(18)
  })

  const { age } = bodySchema.parse(req.body)

  res.send('Hello World')
})

app.use(errorHandling)
export { app }