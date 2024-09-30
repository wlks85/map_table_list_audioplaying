import { Schema, model } from 'mongoose';

const schema = new Schema({
    slug: { type: String, required: true },
    title: { type: String, required: true },
});

export default model('slugs', schema);
