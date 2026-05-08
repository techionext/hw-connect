import { ConnectionControllerIndex } from "@UseCases/Conection/Connection.Controller";
import { InitiateCheckoutControllerIndex } from '@UseCases/IniciateCheckout/initiateCheckout.Controller';
import { Router } from "express";

const initiateCheckoutRoutes = Router();

initiateCheckoutRoutes.get("/", (req, res) => InitiateCheckoutControllerIndex.handle(req, res));

export { initiateCheckoutRoutes };
