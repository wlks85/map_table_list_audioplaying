import { Schema, model } from 'mongoose';

const schema = new Schema({
    page: { type: String, required: true },
    title: { type: String, required: true },
});

export default model('slugs', schema);
