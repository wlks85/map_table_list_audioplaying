import { Request, Response } from 'express';
import path from 'path';



export const audiosController = (req: Request, res: Response) => {
    const audioName = req.params.name;
    const audioPath = path.join(__dirname, '..', 'audios', `${audioName}.flac`);
    res.sendFile(audioPath);
    // res.json(groupedData);
};