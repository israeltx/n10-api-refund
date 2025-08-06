import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refundsRoutes = Router()
const sessionsController = new RefundsController()

refundsRoutes.post('/', verifyUserAuthorization(['employee']), sessionsController.create)

export { refundsRoutes }