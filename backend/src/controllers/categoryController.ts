import { Request, Response } from 'express';
import { csvToJson } from '../utils/csvToJson';
import categoryModel from '../model/categoryModel';


export const uploadCategoryCsv = async (req: Request, res: Response) => {
    try {
        const records = await csvToJson(req.file.path);
        // console.log(records);
        await categoryModel.insertMany(records);
        res.status(201).json({ message: 'Records uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        // console.log('records')
        const categories = await categoryModel.find().sort({ uid: 1 });;
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSubcategories = async (req: Request, res: Response) => {
    try {
        // console.log('records')
        const category = req.params.category;
        const categories = await categoryModel.find({Maincategory: category}).sort({ Subcategory: 1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
