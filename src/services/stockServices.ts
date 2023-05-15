import { invalidProductCodeError } from "../errors/errors";
import stockRepository from "../repositories/stockRepository";
import { formatCSV } from "../utils/formatCSV";

async function validatePrices(csvFile: any) {
  const products = await stockRepository.getPrices();
  const parsedCsv = await formatCSV(csvFile);

  const validateProducts = [];

  for (const csvProduct of parsedCsv) {
    const { product_code, new_price } = csvProduct;

    const dbProduct = products.find((product) => product.code == product_code);

    if (!dbProduct) throw invalidProductCodeError();

    const salesPrice = Number(dbProduct.sales_price);
    const costPrice = Number(dbProduct.cost_price);
    const newPrice = Number(new_price);

    const diff = (newPrice * 100) / salesPrice - 100;

    const status = (costPrice: number, newPrice: number, diff: number) => {
      if (newPrice < costPrice) return "Abaixo do Custo";
      if (diff > 10 || diff < -10) return "Fora da Margem";
      else return "OK";
    };

    validateProducts.push({
      productCode: product_code,
      productName: dbProduct.name,
      salesPrice: salesPrice,
      costPrice: costPrice,
      newPrice: newPrice,
      diff: diff,
      status: status(costPrice, newPrice, diff),
    });
  }
  return validateProducts;
}

async function updatePrices() {
  return "ok";
}

const stockServices = { validatePrices, updatePrices };

export default stockServices;
