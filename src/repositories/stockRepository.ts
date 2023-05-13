import { prisma } from "@/database/db";

async function getPrices() {
  const result = prisma.products.findMany({});

  return result;
}

async function updatePrices() {
  return "ok";
}

const stockRepository = { getPrices, updatePrices };

export default stockRepository;
