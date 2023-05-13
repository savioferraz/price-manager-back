import httpStatus from "http-status";
import { Request, Response } from "express";
import stockServices from "@/services/stockServices";

export async function validatePrices(req: Request, res: Response) {
  try {
    const csvFile = req.file;

    const result = stockServices.validatePrices(csvFile);

    return res.status(200).send(result);
  } catch (error) {
    if (error.name === "invalidFileFormatError") {
      return res.status(httpStatus.NOT_ACCEPTABLE).send(error);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function updatePrices() {
  return "ok";
}
