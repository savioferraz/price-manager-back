import httpStatus from "http-status";
import { Request, Response } from "express";
import stockServices from "../services/stockServices";

export async function validatePrices(req: Request, res: Response) {
  try {
    const csvFile = req.file;

    const result = await stockServices.validatePrices(csvFile);

    return res.status(200).send(result);
  } catch (error) {
    if (error.type === "invalidFileFormatError") {
      return res.status(httpStatus.NOT_ACCEPTABLE).send(error.message);
    } else if (
      error.type === "invalidCsvHeaderError" ||
      error.type === "invalidCsvDataError" ||
      error.type === "invalidProductCodeError"
    ) {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}

export async function updatePrices(req: Request, res: Response) {
  try {
    const csvFile = req.file;

    await stockServices.updatePrices(csvFile);

    return res.sendStatus(200);
  } catch (error) {
    if (error.type === "invalidFileFormatError") {
      return res.status(httpStatus.NOT_ACCEPTABLE).send(error.message);
    } else if (
      error.type === "invalidCsvHeaderError" ||
      error.type === "invalidCsvDataError" ||
      error.type === "invalidProductCodeError"
    ) {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
