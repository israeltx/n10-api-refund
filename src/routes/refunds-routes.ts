import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";

const refundsRoutes = Router()
const sessionsController = new RefundsController()

refundsRoutes.post('/', sessionsController.create)

export { refundsRoutes }