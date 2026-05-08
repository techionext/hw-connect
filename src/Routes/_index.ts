import { MiddlewareRequestLanguage } from "@Shared/Middlewares/MiddlewareRequestLanguage";
import { Router } from "express";
import { initiateCheckoutRoutes } from "./iniciateCheckout";

const indexRoutes = Router();

indexRoutes.use(MiddlewareRequestLanguage);

indexRoutes.use("/initiatecheckout", initiateCheckoutRoutes);

export { indexRoutes };
