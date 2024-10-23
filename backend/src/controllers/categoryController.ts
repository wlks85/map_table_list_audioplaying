import { Request, Response } from 'express';
import { csvToJson } from '../utils/csvToJson';
import categoryModel from '../model/categoryModel';


export const uploadCategoryCsv = async (req: Request, res: Response) => {
    try {
        await categoryModel.deleteMany({})
        const records = await csvToJson(req.file.path);
        // console.log(records);
        await categoryModel.insertMany(records);
        res.status(201).json({ message: 'Records uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNextPage = async (req: Request, res: Response) => {
    try {
        const subcategory = req.params.subcategory;
        const pagenumber = parseInt(req.params.pagenumber); // Convert pagenumber to an integer
        const dir = parseInt(req.params.dir);

        if (isNaN(pagenumber)) {
            return res.status(400).json({ error: "Invalid page number" });
        }

        let matchCondition: any = {};
        if (dir === 1) {
            matchCondition = { $gte: ['$pageNum', pagenumber] };
        } else {
            matchCondition = { $lte: ['$pageNum', pagenumber] };
        }

        const record = await categoryModel.aggregate([
            {
                $match: {
                    Subcategory: subcategory
                }
            },
            {
                $addFields: {
                    pageNum: { $toInt: "$page" }  // Convert page string to integer
                }
            },
            {
                $match: {
                    $expr: matchCondition
                }
            },
            {
                $sort: {
                    page: dir
                }
            },
            {
                $limit: 1  // To return a single record
            }
        ]);

        res.status(200).send(record.length > 0 ? record[0] : null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getCategories = async (req: Request, res: Response) => {
    try {
        // console.log('records')
        const categories = await categoryModel.find().sort({ page: 1 });;
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSubcategories = async (req: Request, res: Response) => {
    try {
        // console.log('records')
        const category = req.params.category;
        console.log(category);
        const categories = await categoryModel.find({ Maincategory: category }).sort({ Subcategory: 1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
