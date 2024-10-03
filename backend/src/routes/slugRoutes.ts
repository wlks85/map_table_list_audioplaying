import { Router } from 'express';
import multer from 'multer';
import { getSlug, uploadCsv } from '../controllers/slugController';

const slugRoutes: Router = Router();
const upload = multer({ dest: 'uploads/' });


slugRoutes.post('/upload', upload.single('file'), uploadCsv);
slugRoutes.get('/:pagenumber/:slug', getSlug);


export default slugRoutes;