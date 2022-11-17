import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import auth from "../config/auth";
import { Prisma } from "../database";
import { AppError } from "../errors/AppError";
import { PrismaRepository } from "../repositories/prismaRepository";

interface IPayload {
  sub: string;
}

export async function validateAccountRequest(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  const prismaRepository = new PrismaRepository(new Prisma());

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: account_id } = verify(token, auth.secret_token) as IPayload;

    const account = await prismaRepository.findAccountByID(account_id);

    if (!account) {
      throw new AppError("User doesn't exists", 401);
    }

    req.account = {
      cpf: account.cpf
    }

    next();

  } catch {
    throw new AppError("invalid token", 401);
  }
}