import { Request, Response } from 'express';
import path from 'path';



export const audiosController = (req: Request, res: Response) => {
    // console.log('first')
    const audioName = req.params.name;
    // console.log(audioName);
    const audioPath = path.join(__dirname, '..', 'audios', `${audioName}.flac`);
    // console.log(audioName);
    res.sendFile(audioPath);
    // res.json(groupedData);
};