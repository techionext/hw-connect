import { MiddlewareRequestLanguage } from "@Shared/Middlewares/MiddlewareRequestLanguage";
import { Router } from "express";
import { connectionRoutes } from "./connection";
import { initiateCheckoutRoutes } from "./iniciateCheckout";
import { testeRoutes } from './Teste';

const indexRoutes = Router();

indexRoutes.use(MiddlewareRequestLanguage);

indexRoutes.use("/connection", connectionRoutes);
indexRoutes.use("/initiatecheckout", initiateCheckoutRoutes);
indexRoutes.use("/teste", testeRoutes);

export { indexRoutes };
