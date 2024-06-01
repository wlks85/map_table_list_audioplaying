import mongoose, {Schema} from "mongoose";

export interface MetaData {
    uid: string;
    place: string;
    lat: string;
    long: string;
    site_code: string;
    sds_code: string;
    kanton: string;
    gender: string;
};

const ModelSchema = new Schema({
    uid: {type: String, required: true,unique: true,},
    place: {type: String, required: true,},
    lat: {type: String, required: false,},
    long: {type: String, required: false,},
    site_code: {type: String, required: false,},
    sds_code: {type: String, required: false,},
    kanton: {type: String, required: false,},
    gender: {type: String, required: false,},
});

const MetaDataModel = mongoose.model<MetaData & Document>('metadata', ModelSchema);
export default MetaDataModel;
