import mongoose, {Schema} from "mongoose";
import {IWord} from '../dto';

// Define the Location schema
const LocationSchema: Schema = new Schema({
    place: { type: String, required: true },
    pronunciation: { type: String, required: false },
  });
  
  // Define the Variant schema
  const VariantSchema: Schema = new Schema({
    title: { type: String, required: true },
    locations: { type: [LocationSchema], required: true },
    pronunciation: { type: String, required: false },
  });
  
  // Define the Word schema
  const WordSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    variants: { type: [VariantSchema], required: true },
  });
  

const WordModel = mongoose.model<IWord & Document>('words', WordSchema,);
export default WordModel;
