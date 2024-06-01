import { IWordService } from "../services";
import { Pagination } from "../dto";

export class WordController {

    constructor(private service: IWordService) {}
     async getWords(pagination: Pagination) {
        const words = await this.service.list(pagination);
        return words;
     }

     async getWord(title: string, params: string[]) {
        const words = await this.service.getByTitle(title,params);
        return words;
     }
};
