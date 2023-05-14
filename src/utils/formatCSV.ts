import fs from "fs";
import csv from "csv-parser";

export function formatCSV(csvFile: any) {
  return new Promise<any[]>((resolve, reject) => {
    const formatedData: any[] = [];

    fs.createReadStream(csvFile.path)
      .pipe(csv())
      .on("data", (data) => formatedData.push(data))
      .on("end", () => resolve(formatedData))
      .on("error", (error) => reject(error));
  });
}
