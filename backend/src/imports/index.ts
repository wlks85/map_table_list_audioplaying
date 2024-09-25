//@ts-ignore
//@ts-nocheck
import { IWord, IVariant, ILocation } from "../dto";
import MetaDataModel from "../models/MetadataModel";
import WordModel from "../models/WordModel";
import ReadCsvFile from "../parser";

const keyMapper = (item: any) => {
  return Object.keys(item).reduce((acc: any, c: string) => {
    acc[c.toLowerCase()] = item[c];
    return acc;
  }, {});
};

export const ImportMetadata = async () => {
  let metadata = await ReadCsvFile("./metadata_online_atlas.csv");
  metadata = metadata.map(keyMapper);
  try {
    for (let index = 0; index < metadata.length; index++) {
      const element = new MetaDataModel(metadata[index]);
      await element.save();
    }
  } catch (error) {
    console.log("Error in storing metadata", error);
  }
  return metadata;
};

export const ImportWord = async (title: string) => {
  try {
    const dataVariants = await ReadCsvFile(`${title}.csv`);
    let variantsData = dataVariants.map(keyMapper);
    const metadata = await MetaDataModel.find({});
    const variants: IVariant[] = [];
    for (let index = 0; index < variantsData.length; index++) {
      const variant = variantsData[index];
      const meta = metadata.find((c) => c.uid === variant.uid);
      let v = variants.find((item) => item.title === variant["v1"]);
      if (!v) {
        v = {
          title: variant["v1"],
          locations: [
            {
              place: meta?.place || "",
              pronunciation: "",
            },
          ],
        };
        variants.push(v);
      } else {
        v.locations.push({
          place: meta?.place || "",
          pronunciation: "",
        });
      }
    }
    const word: IWord = {
      variants,
      title,
    };
    const sWord = new WordModel(word);
    await sWord.save();
    return word;
  } catch (error) {
    throw error;
  }
};
