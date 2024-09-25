import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

interface subCategoriesController {
    category: string;
    subcategory: string;
    pagetitle: string;
    pagenumber: number;
}


let subCategoriesController: subCategoriesController[] = [];


// Read the CSV File Data 
const readCSV = () =>{
    const results: subCategoriesController[] = [];
    fs.createReadStream(path.join(__dirname,"../parser",'categories_words.csv' ))
        .pipe(csv())
        .on('data',(data)=>{
            results.push({
                category:data.Maincategory,
                subcategory: data.Subcategory,
                pagetitle: data.Pagetitle,
                pagenumber: data.Pagenumber,
            });
        })
        .on('end',()=>{
            subCategoriesController = results;
        })
};

readCSV();



// Controller function to get data
export const subCategoryController = (req: Request, res: Response) => {
    // console.log(groupedData)
    res.json(subCategoriesController);
    // res.json(groupedData);
};
