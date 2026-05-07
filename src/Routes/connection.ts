import { ConnectionControllerIndex } from "@UseCases/Conection/Connection.Controller";
import { Router } from "express";

const connectionRoutes = Router();

connectionRoutes.get("/", (req, res) => ConnectionControllerIndex.handle(req, res));

export { connectionRoutes };
