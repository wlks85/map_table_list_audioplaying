//ts-nocheck
import { IWordService } from ".";
import { IWord, Pagination } from "../dto";
import WordModel from "../models/WordModel";
const getRandomNumber = () => {
    const value = Math. random() * (2 - 0) + 0;
    if(value < 0.5) return 0;
    else return Math.ceil(value);
}

export class WordService implements IWordService {
    
    async list(pagination: Pagination): Promise<IWord[]> {
      const {limit, offset} = pagination;
       const  words = await WordModel
    //    .find({}, {title: 1}, {limit: limit,skip: offset});
        .aggregate([
            {$match: {}},
            {$unwind: "$variants"},
            {$group: {
                _id: "$_id",
                title: { $first: "$title" },
                sub_title: { $first: "$title" },
                variant_count: { $sum: 1 },
            }},
            { $skip: offset },
            { $limit: limit },
            { $sort: {title: 1}}
        ]);
    //     const rs = [];
    //     for (let index = 0; index < words.length * 10; index++) {
    //         const element = words[getRandomNumber()];
    //         rs.push(element)
    //     }
    //    return rs;
        return words;
    }

    async getByTitle(title: string, props: string[] = [], pagination: Pagination,): Promise<IWord| undefined| null> {
        const skip = 0;
        const pageSize = 20;
        if(props.length === 0) {
            const word = await WordModel.findOne({title: title}, {title: 1});
            return word;
        }else if(props.indexOf('variants') > -1) {
            let query = [
                {$match: {title: title}},
                {$unwind: "$variants"},
                { $skip: skip },
                { $limit: pageSize },
                {
                    $group: {
                        _id: "$_id",
                        title: { $first: "$title" },
                        totalVariants: { $sum: 1 },
                        variants: { $push: {_id: "$variants._id",title: "$variants.title", pronounciation: "$variants.pronounciation"} }
                    }
                }
            ];
            if(props.length>1) {
                query = [
                    {$match: {title: title}},
                    {$unwind: "$variants"},
                    {$match: {"variants.title": props[1]}},
                    {
                        $group: {
                            _id: "$_id",
                            title: { $first: "$title" },
                            totalVariants: { $sum: 1 },
                            variants: { $push: "$variants" }
                        }
                    }
                ];
            }
            const words = await WordModel.aggregate(query);

            if(words.length) return words[0]
        }else if(props.indexOf('locations') > -1) {
            const words = await WordModel.aggregate([
                { $match: { title } },
                { $unwind: "$variants" },
                { $match: { "variants.variant": props[1] } },
                {
                $project: {
                    _id: "$variants.id",
                    locations: "$variants.locations"
                }
                }
            ]);

            if(words.length) return words[0]
        }
    }

}
