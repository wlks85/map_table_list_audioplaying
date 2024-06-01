//@ts-nocheck
import { WordController } from "../controllers/WordController";
import { WordService } from "../services/WordService";

//services
const wordService = new WordService();

//controllers
const wordController = new WordController(wordService,);

const DEP_STORE = {
    controllers: {
        'WordController': wordController,
    }
};


export const DependencyManger = {
    getController(key: string) {
        const p: any = DEP_STORE.controllers[key];
        if(!p) throw new Error('Unknown singleton expected');
        return p;
    }
};
