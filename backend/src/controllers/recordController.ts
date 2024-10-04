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
        const records = await recordModel.find().sort({ word: 1 });
        records.sort((a: any, b: any) => a.variant.localeCompare(b.variant, 'de', { sensitivity: 'base' }))
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
        records.sort((a: any, b: any) => a.variant.localeCompare(b.variant, 'de', { sensitivity: 'base' }))
        console.log(records)
        const uniqueRecords = Array.from(new Map(records.map(item => [item.variant, item])).values());
        res.status(200).json({
            data: records,
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}