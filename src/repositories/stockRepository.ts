import { prisma } from "../database/db";

async function getPrices() {
  const result = prisma.products.findMany({});

  return result;
}

async function updatePrices(dbProduct: number, newPrice: number) {
  await prisma.products.update({ where: { code: dbProduct }, data: { sales_price: newPrice } });
}

const stockRepository = { getPrices, updatePrices };

export default stockRepository;
