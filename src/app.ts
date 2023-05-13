import express, { Express } from "express";
import cors from "cors";
import { loadEnv } from "./config/envs";
import { connectDb, disconnectDb } from "./database/db";
import stockRoutes from "./routers/stockRoutes";

loadEnv();

const app = express();

app.use(cors()).use(express.json());

app.use("/stock", stockRoutes);

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close() {
  await disconnectDb();
}

export default app;
