import { ImportMetadata, ImportWord } from "../imports";

export class UploadController {
    async processMetaFile() {
        const data = await ImportMetadata();
        return data;
    }

    async importWord(title: string) {
        const data = await ImportWord(title);
        return data;
    }
}
