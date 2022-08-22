import { Account } from "@prisma/client";
import { singleton } from "tsyringe";
import { Prisma } from "../database";
import { AccountDTO } from "../dtos/AccountDTO.dto";
import { AppError } from "../errors/AppError";
import { IAccountRepository } from "./interfaces/IAccountRepository";

@singleton()
export class PrismaRepository implements IAccountRepository {

  constructor(private prisma: Prisma) { }

  async findAccountByID(id: string): Promise<Account | null> {
    return await this.prisma.account.findUnique({
      where: {
        id
      }
    });
  }

  async findAccountByCPF(cpf: string): Promise<Account | null> {
    return await this.prisma.account.findUnique({
      where: {
        cpf
      }
    });
  }

  async createAccount({ name, cpf }: AccountDTO): Promise<Account> {
    return await this.prisma.account.create({
      data: {
        name,
        cpf
      }
    });
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.prisma.account.findMany();
  }

  async depositMoney(cpf: string, ammount: number): Promise<void> {
    await this.prisma.account.update({
      where: {
        cpf
      },
      data: {
        balance: {
          increment: ammount
        },
        deposits: {
          push: ammount
        }
      }
    });
  }

  async withdrawMoney(cpf: string, ammount: number): Promise<void> {
    await this.prisma.account.update({
      where: {
        cpf
      },
      data: {
        balance: {
          decrement: ammount,
        },
        withdraws: {
          push: ammount
        }
      }
    });
  }

  async transferMoney(fromAccountCpf: string, toAccountCpf: string, ammount: number): Promise<void> {
    await this.prisma.account.update({
      where: {
        cpf: fromAccountCpf
      },
      data: {
        balance: {
          decrement: ammount,
        },
        transfers: {
          push: { toAccountCpf, ammount }
        }
      }
    });

    await this.prisma.account.update({
      where: {
        cpf: toAccountCpf
      },
      data: {
        balance: {
          increment: ammount,
        },
        transfers: {
          push: { fromAccountCpf, ammount }
        }
      }
    });
  }



}