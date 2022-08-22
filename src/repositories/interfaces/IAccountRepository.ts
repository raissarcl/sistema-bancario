import { Account } from "@prisma/client";
import { AccountDTO } from "../../dtos/AccountDTO.dto";

export interface IAccountRepository {
  createAccount(account: AccountDTO): Promise<Account>;
  findAccountByID(id: string): Promise<Account | null>;
  findAccountByCPF(cpf: string): Promise<Account | null>;
  getAllAccounts(): Promise<Account[]>;
  depositMoney(cpf: string, ammount: number): Promise<void>;
  transferMoney(fromAccountCpf: string, toAccountCpf: string, ammount: number): Promise<void>;
}