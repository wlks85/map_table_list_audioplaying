import { Request, Response } from 'express';
import { csvToJson } from '../utils/csvToJson';
import slugModel from '../model/slugModel';

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
        // console.log('records')
        const data = await slugModel.findOne({ slug: req.query.slug });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
