import { prisma } from "@/database/db";

async function updatePrices() {
  return "ok";
}

const stockRepository = { updatePrices };

export default stockRepository;
