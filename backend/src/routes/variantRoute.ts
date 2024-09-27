import { Router } from 'express';
import { pagetitleController } from '../controllers/recordController';

const variantRoute: Router = Router();

variantRoute.get('/', pagetitleController)

export default variantRoute;