import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface CsvRow {
  [key: string]: string;
}

async function ReadCsvFile(filePath: string): Promise<CsvRow[]> {
  return new Promise((resolve, reject) => {
    const results: CsvRow[] = [];

    fs.createReadStream(path.resolve(__dirname, filePath))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}


export default ReadCsvFile;
