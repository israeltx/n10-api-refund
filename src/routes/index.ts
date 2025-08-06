import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";

const routes = Router()

// Public routes
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

export { routes }