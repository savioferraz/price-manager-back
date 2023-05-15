import fs from "fs";
import csv from "csv-parser";
import { invalidCsvDataError, invalidCsvHeaderError } from "../errors/errors";

export function formatCSV(csvFile: any) {
  return new Promise<any[]>((resolve, reject) => {
    const formatedData: any[] = [];
    let validHeaders = false;
    let validData = false;

    fs.createReadStream(csvFile.path)
      .pipe(csv())
      .on("headers", (headers) => {
        if (headers.includes("product_code") && headers.includes("new_price")) {
          validHeaders = true;
        } else reject(invalidCsvHeaderError());
      })
      .on("data", (data) => {
        if (!isNaN(data.product_code) && !isNaN(data.new_price)) {
          formatedData.push(data);
          validData = true;
        } else reject(invalidCsvDataError());
      })
      .on("end", () => {
        if (validHeaders && validData) {
          resolve(formatedData);
        }
      })
      .on("error", (error) => reject(error));
  });
}
