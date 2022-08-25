import { Account } from "@prisma/client";
import { singleton } from "tsyringe";
import { Prisma } from "../database";
import { AccountDTO } from "../dtos/AccountDTO.dto";
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

  async deleteAccount(cpf: string): Promise<void> {
    await this.prisma.account.delete({
      where: {
        cpf
      }
    });
  }

  async depositMoney(cpf: string, value: number): Promise<void> {
    await this.prisma.account.update({
      where: {
        cpf
      },
      data: {
        balance: {
          increment: value
        },
        deposits: {
          push: value
        }
      }
    });
  }

  async withdrawMoney(cpf: string, value: number): Promise<void> {
    await this.prisma.account.update({
      where: {
        cpf
      },
      data: {
        balance: {
          decrement: value,
        },
        withdraws: {
          push: value
        }
      }
    });
  }

  async transferMoney(fromAccountCpf: string, toAccountCpf: string, value: number): Promise<void> {
    await this.prisma.account.update({
      where: {
        cpf: fromAccountCpf
      },
      data: {
        balance: {
          decrement: value,
        },
        transfers: {
          push: { toAccountCpf, value }
        }
      }
    });

    await this.prisma.account.update({
      where: {
        cpf: toAccountCpf
      },
      data: {
        balance: {
          increment: value,
        },
        transfers: {
          push: { fromAccountCpf, value }
        }
      }
    });
  }

  async updateAccount({ newName, newCpf, cpf }: { cpf: string, newName?: string, newCpf?: string }): Promise<void> {
    await this.prisma.account.update({
      where: {
        cpf
      },
      data: {
        name: newName,
        cpf: newCpf
      }
    });
  }

}