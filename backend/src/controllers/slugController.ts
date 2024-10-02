import { Request, Response } from 'express';
import { csvToJson } from '../utils/csvToJson';
import slugModel from '../model/slugModel';
import categoryModel from '../model/categoryModel';
export const uploadCsv = async (req: Request, res: Response) => {
    try {
        const slugs = await csvToJson(req.file.path);
        // console.log(records);
        await slugModel.insertMany(slugs);
        res.status(201).json({ message: 'Records uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getSlug = async (req: Request, res: Response) => {
    try {
        const slug = await slugModel.findOne({ slug: req.params.slug });
        if (slug) {
            const record = await categoryModel.findOne({ Pagetitle: slug.title });
            res.status(200).json({
                Pagenumber: record?.Pagenumber,
                Subcategory: record?.Subcategory,
                Maincategory: record?.Maincategory
            });
        } else {
            res.status(400).json({});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
