import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

interface pagetitleController {
    id: number,
    category: string,
    page: number,
    word: string,
    variant: string,
    cohort: string,
    gender: string,
    location: string,
    location_code: string,
    uid: string,
    audio: string,
}

let pagetitlecsvdata: pagetitleController[] = [];

// Read the CSV File Data 
const readCSV = () => {
    const results: pagetitleController[] = [];
    fs.createReadStream(path.join(__dirname, "../parser", 'extracted_info_with_category.csv'))
        .pipe(csv())
        .on('data', (data) => {
            // console.log(data)
            results.push({
                id: data.ID,
                category: data.category,
                page: data.page,
                word: data.word,
                variant: data.variant,
                cohort: data.cohort,
                gender: data.gender,
                location: data.location,
                location_code: data.location_code,
                uid: data.uid,
                audio: data.audio,
            });
        })
        .on('end', () => {
            pagetitlecsvdata = results;
        })
};

readCSV();

// console.log(pagetitlecsvdata)
// Controller function to get data
export const pagetitleController = (req: Request, res: Response) => {
    const pageNumber = parseInt(req.params.number);
    const pageTitleData = pagetitlecsvdata.filter(item => parseInt(item.page) === pageNumber);

    // console.log(pageTitleData)
    res.json(pageTitleData);
    // res.json(groupedData);
};



