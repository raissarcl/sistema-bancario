import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function validateAccountRequest(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.headers;

  if (!cpf) throw new AppError("Account not provided", 401);

  next();
}