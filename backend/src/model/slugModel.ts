import { Schema, model } from 'mongoose';

const schema = new Schema({
    page: { type: String, required: true },
    slug: { type: String, required: true },
});

export default model('slugs', schema);
