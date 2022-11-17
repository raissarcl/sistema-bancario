import { inject, injectable } from "tsyringe";
import { AccountDTO } from "../dtos/AccountDTO.dto";
import { Account } from "@prisma/client";
import { AppError } from "../errors/AppError";
import { IAccountRepository } from "../repositories/interfaces/IAccountRepository";
import { sign } from "jsonwebtoken";
import auth from '../config/auth';


@injectable()
export class AccountService {

  constructor(@inject("PrismaRepository") private repository: IAccountRepository) { }

  async authenticateUser(name: string, cpf: string) {
    const account = await this.repository.findAccountByCPF(cpf);

    if (!account) throw new AppError("Account doesn't exist");

    if (account.name !== name) throw new AppError("Incorrect values");

    const token = sign({}, auth.secret_token, {
      subject: account.id,
      expiresIn: auth.expires_in_token,
    });

    return {
      name: account.name,
      cpf: account.cpf,
      token
    };
  }

  async createAccount({ name, cpf }: AccountDTO): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);

    if (account) throw new AppError("Account already exists");

    await this.repository.createAccount({ name, cpf });
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.repository.getAllAccounts();
  }

  async deleteAccount(cpf: string): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);

    if (!account) throw new AppError("Account doesn't exist", 401);

    await this.repository.deleteAccount(cpf);
  }

  async getAccount(id: string): Promise<Account> {
    const account = await this.repository.findAccountByID(id);

    if (!account) throw new AppError("Account doesn't exist");

    return account;
  }

  async depositMoney(cpf: string, value: number): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);

    if (!account) throw new AppError("Account doesn't exist");

    await this.repository.depositMoney(cpf, value);
  }

  async withdrawMoney(cpf: string, value: number): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);

    if (!account) {
      throw new AppError("Account doesn't exist");
    }

    if (account.balance < value) {
      throw new AppError("value not valid");
    }

    await this.repository.withdrawMoney(cpf, value);
  }

  async transferMoney(fromAccountCpf: string, toAccountCpf: string, value: number): Promise<void> {
    const account = await this.repository.findAccountByCPF(fromAccountCpf);
    const toAccount = await this.repository.findAccountByCPF(toAccountCpf);

    if (!account || !toAccount) throw new AppError("Invalid data");

    if (account === toAccount) throw new AppError("Invalid data");

    if (account.balance < value) throw new AppError("Invalid data");

    await this.repository.transferMoney(fromAccountCpf, toAccountCpf, value);
  }

  async updateAccount({ cpf, newCpf, newName }: { cpf: string, newCpf?: string, newName?: string }): Promise<void> {
    const account = await this.repository.findAccountByCPF(cpf);
    const updatedAccount = newCpf ? await this.repository.findAccountByCPF(newCpf) : newCpf;

    if (!account || updatedAccount) throw new AppError("At least one account doesn't exist");

    await this.repository.updateAccount({ cpf, newCpf, newName });
  }

}

