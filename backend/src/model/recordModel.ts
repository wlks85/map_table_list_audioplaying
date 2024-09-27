import { Schema, model } from 'mongoose';

const recordSchema = new Schema({
    ID: { type: Number, required: true },
    category: { type: String, required: true },
    page: { type: Number, required: true },
    word: { type: String, required: true },
    variant: { type: String, required: true },
    cohort: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    location_code: { type: String, required: true },
    uid: { type: String, required: true },
    audio: { type: String, required: true },
});

export default model('Record', recordSchema);
