import stockRepository from "../repositories/stockRepository";
import { formatCSV } from "../utils/formatCSV";

async function validatePrices(csvFile: any) {
  const products = await stockRepository.getPrices();
  const parsedCsv = await formatCSV(csvFile);

  const validateProducts = [];

  for (const csvProduct of parsedCsv) {
    const { product_code, new_price } = csvProduct;

    const dbProduct = products.find((product) => product.code == product_code);

    const salesPrice = Number(dbProduct.sales_price);
    const costPrice = Number(dbProduct.cost_price);
    const newPrice = Number(new_price);

    if (newPrice < costPrice) {
      validateProducts.push({ product_code: product_code, new_price: newPrice, status: "BELOW_COST" });
    }
    if (newPrice > salesPrice * 1.1 || newPrice < salesPrice * 0.9) {
      validateProducts.push({
        product_code: product_code,
        new_price: newPrice,
        status: "OUT_OF_RANGE",
      });
    } else {
      validateProducts.push({
        product_code: product_code,
        new_price: newPrice,
        status: "OK",
      });
    }
  }
  return validateProducts;
}

async function updatePrices() {
  return "ok";
}

const stockServices = { validatePrices, updatePrices };

export default stockServices;
