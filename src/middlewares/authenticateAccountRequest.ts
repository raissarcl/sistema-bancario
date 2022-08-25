import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function validateAccountRequest(req: Request, res: Response, next: NextFunction) {
  const cpf = req.get('cpf');

  if (!cpf) throw new AppError("Unauthorized", 401);

  next();
}