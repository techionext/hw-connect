import { MiddlewareRequestLanguage } from "@Shared/Middlewares/MiddlewareRequestLanguage";
import { Router } from "express";
import { connectionRoutes } from "./connection";

const indexRoutes = Router();

indexRoutes.use(MiddlewareRequestLanguage);

indexRoutes.use("/connection", connectionRoutes);

export { indexRoutes };
