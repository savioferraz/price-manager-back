import { invalidPriceError, invalidProductCodeError } from "../errors/errors";
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

async function updatePrices(csvFile: any) {
  const products = await stockRepository.getPrices();
  const parsedCsv = await formatCSV(csvFile);

  for (const csvProduct of parsedCsv) {
    const { product_code, new_price } = csvProduct;

    const dbProduct = products.find((product) => product.code == product_code);

    if (!dbProduct) throw invalidProductCodeError();

    const productCode = Number(dbProduct.code);
    const salesPrice = Number(dbProduct.sales_price);
    const costPrice = Number(dbProduct.cost_price);
    const newPrice = Number(new_price);

    const diff = (newPrice * 100) / salesPrice - 100;

    if (newPrice < costPrice || diff > 10 || diff < -10) throw invalidPriceError();

    const packItens = await stockRepository.getPackByItens(productCode);

    if (packItens.length > 0) {
      const packPrice = newPrice;

      for (const packItem of packItens) {
        const packItemId = Number(packItem.product_id);
        const singlePrice = packPrice / Number(packItem.qty);

        await stockRepository.updatePrices(packItemId, singlePrice);
      }
    }

    const itensPack = await stockRepository.getItensByPack(productCode);
    if (itensPack.length > 0) {
      const itemPrice = newPrice;

      for (const itemPack of itensPack) {
        const itemPackId = Number(itemPack.pack_id);
        const totalPrice = itemPrice * Number(itemPack.qty);

        await stockRepository.updatePrices(itemPackId, totalPrice);
      }
    }

    await stockRepository.updatePrices(productCode, newPrice);
  }
}

const stockServices = { validatePrices, updatePrices };

export default stockServices;
