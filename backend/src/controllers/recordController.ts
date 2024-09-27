import { Request, Response } from 'express';
import { csvToJson } from '../utils/csvToJson';
import recordModel from '../model/recordModel';


export const uploadCsv = async (req: Request, res: Response) => {
    try {
        const records = await csvToJson(req.file.path);
        // console.log(records);
        await recordModel.insertMany(records);
        res.status(201).json({ message: 'Records uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getRecords = async (req: Request, res: Response) => {
    try {
        // console.log('records')
        const records = await recordModel.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const pagetitleController = async (req: Request, res: Response) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber as string);
        // console.log('first')
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const records = await recordModel.find({ page: pageNumber }).skip(skip).limit(limit).sort({ variant: 1 });
        const total = await recordModel.countDocuments({ page: pageNumber });
        res.status(200).json({
            data: records,
            total,
            page,
            pages: Math.ceil(total / limit),
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}