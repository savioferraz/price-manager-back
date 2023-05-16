import { prisma } from "../database/db";

async function getPrices() {
  const result = prisma.products.findMany({});

  return result;
}

async function updatePrices(dbProduct: number, newPrice: number) {
  await prisma.products.update({ where: { code: dbProduct }, data: { sales_price: newPrice } });
}

async function getPackByItens(packId: number) {
  const result = await prisma.packs.findMany({ where: { pack_id: packId } });

  return result;
}

async function getItensByPack(productId: number) {
  const result = await prisma.packs.findMany({ where: { product_id: productId } });

  return result;
}

const stockRepository = { getPrices, updatePrices, getPackByItens, getItensByPack };

export default stockRepository;
