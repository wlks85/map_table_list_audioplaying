import { Document } from "mongoose";
export interface IWord extends Document {
    title: string;
    variants: IVariant[],
}

export interface IVariant extends Document {
    title: string;
    pronunciation: string;
    locations: ILocation[];
}

export interface ILocation extends Document {
    place: string;
    pronunciation: string;
}

export interface Pagination {
    limit: number;
    offset: number;
};
