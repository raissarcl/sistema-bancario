import { Account } from "@prisma/client";
import { AccountDTO } from "../../dtos/AccountDTO.dto";

export interface IAccountRepository {
  createAccount(account: AccountDTO): Promise<Account>;
  findAccountByID(id: string): Promise<Account | null>;
  findAccountByCPF(cpf: string): Promise<Account | null>;
  deleteAccount(cpf: string): Promise<void>;
  getAllAccounts(): Promise<Account[]>;
  depositMoney(cpf: string, value: number): Promise<void>;
  withdrawMoney(cpf: string, value: number): Promise<void>;
  transferMoney(fromAccountCpf: string, toAccountCpf: string, value: number): Promise<void>;
  updateAccount({ newName, newCpf, cpf }: { cpf: string, newName?: string, newCpf?: string }): Promise<void>;
}
