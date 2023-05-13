import csvParser from "csv-parser";

export async function formatCSV(csvFile: any) {
  const formatedData: any[] = [];

  csvFile.pipe(csvParser()).on("data", (row: any) => {
    const formatedRow = {
      product_code: row.product_code.trim(),
      new_price: parseFloat(row.new_price.trim()),
    };

    formatedData.push(formatedRow);
  });

  return formatedData;
}
