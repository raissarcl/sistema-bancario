import { inject, injectable } from "tsyringe";
import { AccountDTO } from "../dtos/AccountDTO.dto";
import { Account } from "@prisma/client";
import { AppError } from "../errors/AppError";
import { IAccountRepository } from "../repositories/interfaces/IAccountRepository";


@injectable()
export class AccountService {

  constructor(@inject("PrismaRepository") private repository: IAccountRepository) { }

  async createAccount({ name, cpf }: AccountDTO): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);

    if (account) throw new AppError("Account already exists");

    await this.repository.createAccount({ name, cpf });
  }

  async getAccount(id: string): Promise<Account> {
    const account = await this.repository.findAccountByID(id);

    if (!account) throw new AppError("Account doesn't found", 401);

    return account;
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.repository.getAllAccounts();
  }

  async depositMoney(cpf: string, ammount: number): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);

    if (!account) throw new AppError("Account doesn't exists", 401);

    await this.repository.depositMoney(cpf, ammount);
  }

  async withdrawMoney(cpf: string, ammount: number): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);

    if (!account) {
      throw new AppError("Account doesn't exists", 401);
    }

    if (account.balance < ammount) {
      throw new AppError("Ammount not valid");
    }

    await this.repository.withdrawMoney(cpf, ammount);
  }

  async transferMoney(fromAccountCpf: string, toAccountCpf: string, ammount: number): Promise<void> {
    const account = await this.repository.findAccountByCPF(fromAccountCpf);
    const toAccount = await this.repository.findAccountByCPF(toAccountCpf);

    if (!account || !toAccount) throw new AppError("Account doesn't exist", 401);

    if (account.balance < ammount) throw new AppError("Ammount not valid");

    await this.repository.transferMoney(fromAccountCpf, toAccountCpf, ammount);
  }

  async updateAccount({ cpf, newCpf, name }: { cpf: string, newCpf?: string, name?: string }): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);
    const updatedAccount = newCpf ? await this.repository.findAccountByCPF(newCpf) : newCpf;

    if (!account || updatedAccount) throw new AppError("Invalid data");

    await this.repository.updateAccount({ cpf, newCpf, name });
  }

}

