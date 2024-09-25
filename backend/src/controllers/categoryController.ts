import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

interface Category {
    category: string;
    subcategory: string;
}

interface GroupedData {
    [key: string]: string[];
}

let categories: Category[] = [];

let groupedData: GroupedData = {};

// Read the CSV File Data 
const readCSV = () => {
    const results: Category[] = [];
    fs.createReadStream(path.join(__dirname, "../parser", 'categories_data.csv'))
        .pipe(csv())
        .on('data', (data) => {
            results.push({
                category: data.Maincategory,
                subcategory: data.Subcategory
            });
        })
        .on('end', () => {
            categories = results;
        })
};

readCSV();

// Reduce Json
// const reduceJSON = () =>{
//     const jsonData: categoriesController[] =categoriesController;
//     groupedData = jsonData.reduce((acc, item) => {
//         if (item.category) {
//             console.log(item.category)
//             if (!acc[item.category]) {
//                 acc[item.category] = [];
//             }
//             acc[item.category].push(item.subcategory);
//         }
//         return acc;
//     }, {} as GroupedData);
// }
// reduceJSON();

// Controller function to get data
export const categoryController = async (req: Request, res: Response) => {
    if (categories.length === 0) {
        try {
            await readCSV();
        } catch (error) {
            console.error("Error reading CSV:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    res.json(categories);
};
