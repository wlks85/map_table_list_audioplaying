import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    page: { type: String },
    variant: { type: String },
    cohort: { type: String },
    gender: { type: String },
    location: { type: String },
    location_code: { type: String },
    uid: { type: String },
    audio: { type: String },
    Maincategory: { type: String },
    Subcategory: { type: String },
    Pagetitle: { type: String },
    Pagenumber: { type: String },
    bg_color: {type: String},
    color: {type: String},
});

export default model('CategoryModel', categorySchema);