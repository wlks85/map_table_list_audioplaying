import { Router } from 'express';
import multer from 'multer';
import { getCategories, getSubcategories, uploadCategoryCsv,getNextPage } from '../controllers/categoryController';
import { pagetitleController } from '../controllers/recordController';


const categoryRoutes: Router = Router();
const upload = multer({ dest: 'uploads/' });


categoryRoutes.post('/upload', upload.single('file'), uploadCategoryCsv);
categoryRoutes.get('/', getCategories);
categoryRoutes.get('/:category', getSubcategories);
categoryRoutes.get('/:subcategory/:pagenumber/:dir', getNextPage);
categoryRoutes.get('/pagedata', pagetitleController);



export default categoryRoutes;