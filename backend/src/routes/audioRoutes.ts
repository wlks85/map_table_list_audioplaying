import { Router } from "express";
import { audiosController } from "../controllers/audiosController";


const audioRoute: Router = Router();
audioRoute.get("/:name",audiosController)

export default audioRoute;