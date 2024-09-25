import { Router } from "express";
import { categoryController } from "../controllers/categoryController";
import { subCategoryController } from "../controllers/subCategoryController";
import { pagetitleController } from "../controllers/pagetitleController";


const categoryRoute: Router = Router();

categoryRoute.get("/",categoryController);
categoryRoute.get("/subCategory/",subCategoryController);
categoryRoute.get("/subCategory/:number",pagetitleController);


export default categoryRoute;