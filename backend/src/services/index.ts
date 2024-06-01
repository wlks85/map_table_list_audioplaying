import { IWord, Pagination } from "../dto";

export interface IWordService {
    list(pagination: Pagination): Promise<IWord[]>;
    getByTitle(title: string, props: string[], pagination?: Pagination): Promise<IWord| undefined| null>;
};
