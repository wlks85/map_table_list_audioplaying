import { Request, Response, Router } from "express";
import { DependencyManger } from "../lib";
import { WordController } from "../controllers/WordController";
import { Pagination } from "../dto";
import { asyncHandler } from "../middlewares";

const wordController: WordController = DependencyManger.getController('WordController');

const WordsRouter: Router = Router();

WordsRouter.get("/", asyncHandler(async (req: Request, res: Response) => {
    
}));

WordsRouter.get("/:word", asyncHandler(async (req: Request, res: Response) => {
    let {limit, offset}: any = req.query;
    const word = req.params.word;
    if(!limit) {
        limit = 10;
    }
    if(!offset) {
        offset = 0;
    }
    const response = await wordController.getWord(word, []);
    res.json(response);
}));

WordsRouter.get("/:word/variants", async (req: Request, res: Response) => {
    let {limit, offset}: any = req.query;
    const word = req.params.word;
    if(!limit) {
        limit = 10;
    }
    if(!offset) {
        offset = 0;
    }
    const response = await wordController.getWord(word, ['variants']);
    res.json(response);
});

WordsRouter.get("/:word/variants/:variant", async (req: Request, res: Response) => {
    let {limit, offset}: any = req.query;
    const word = req.params.word;
    const variant = req.params.variant;
    if(!limit) {
        limit = 10;
    }
    if(!offset) {
        offset = 0;
    }
    const response = await wordController.getWord(word, ['variants', variant]);
    res.json(response);
});

export default WordsRouter;
