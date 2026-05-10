import { Router } from "express";
import { TesteControllerIndex } from "@UseCases/Teste/Teste.Controller";

const testeRoutes = Router();

testeRoutes.post("/", (req, res) => TesteControllerIndex.handle(req, res));

export { testeRoutes };
