import { prisma } from "../database/db";

async function getPrices() {
  const result = prisma.products.findMany({});

  return result;
}

async function updatePrices(dbProduct: number, newPrice: number) {
  await prisma.products.update({ where: { code: dbProduct }, data: { sales_price: newPrice } });
}

async function getPackItens(packId: number) {
  const result = await prisma.packs.findMany({ where: { pack_id: packId } });

  return result;
}

const stockRepository = { getPrices, updatePrices, getPackItens };

export default stockRepository;
