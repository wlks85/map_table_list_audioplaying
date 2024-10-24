import { Request, Response } from 'express';
import { csvToJson } from '../utils/csvToJson';
import recordModel from '../model/recordModel';


export const uploadCsv = async (req: Request, res: Response) => {
    try {
        await recordModel.deleteMany({})

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
        const records = await recordModel.find().sort({ word: 1 });
        records.sort((a: any, b: any) => a.variant.localeCompare(b.variant, 'de', { sensitivity: 'variant' }))
        console.log(records)
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const pagetitleController = async (req: Request, res: Response) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber as string);

        const records = await recordModel.find({ page: pageNumber }).sort({ word: 1 });
        const customSort = (a: any, b: any) => {
            if (a.variant === b.variant) {
                if (a.cohort === 'alt') return -1;
                if (b.cohort === 'alt') return 1;
                return 0;
            }
            return a.variant.localeCompare(b.variant, 'de', { sensitivity: 'variant' });
        };
        records.sort(customSort);
        res.status(200).json({
            data: records,
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}