import stockRepository from "@/repositories/stockRepository";
import { formatCSV } from "@/utils/formatCSV";

async function validatePrices(csvFile: any) {
  const prices = await stockRepository.getPrices();
  const parsedCsv = formatCSV(csvFile);

  const validateProducts = [];

  return "ok";
}

async function updatePrices() {
  return "ok";
}

const stockServices = { validatePrices, updatePrices };

export default stockServices;
