import { Router } from 'express';
import multer from 'multer';
import { getRecords, uploadCsv } from '../controllers/recordController';

const recordRoutes: Router = Router();
const upload = multer({ dest: 'uploads/' });


recordRoutes.post('/upload', upload.single('file'), uploadCsv);
recordRoutes.get('/', getRecords);


export default recordRoutes;