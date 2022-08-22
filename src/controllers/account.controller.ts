import { singleton } from "tsyringe";
import { Request, Response } from "express";
import { AccountService } from "../services/account.service";

@singleton()
export class AccountController {

  constructor(private accountService: AccountService) { }

  async createAccount(req: Request, res: Response) {
    const { name, cpf } = req.body;

    await this.accountService.createAccount({ cpf, name });

    return res.json({ msg: "Account created", name, cpf });
  }

  async getAllAccounts(req: Request, res: Response) {
    const accounts = await this.accountService.getAllAccounts();

    return res.json({ msg: "Accounts found", accounts });
  }


  async deleteAccount(req: Request, res: Response) {
    const cpf = req.get('cpf');

    await this.accountService.deleteAccount(cpf as string);

    return res.json({ msg: "Account deleted" });
  }

  async getAccount(req: Request, res: Response) {
    const { id } = req.params;

    const account = await this.accountService.getAccount(id);

    return res.json({ msg: "Account found", account });
  }

  async depositMoney(req: Request, res: Response) {
    const cpf = req.get('cpf');

    const { ammount } = req.body;

    await this.accountService.depositMoney(cpf as string, ammount);

    return res.json({ msg: "Deposit accepted" });
  }

  async withdrawMoney(req: Request, res: Response) {
    const cpf = req.get('cpf');

    const { ammount } = req.body;

    await this.accountService.withdrawMoney(cpf as string, ammount);

    return res.json({ msg: "Withdraw accepted" });
  }

  async transferMoney(req: Request, res: Response) {
    const cpf = req.get('cpf');

    const { toAccountCpf, ammount } = req.body;

    await this.accountService.transferMoney(cpf as string, toAccountCpf, ammount);

    return res.json({ msg: "Transfer accepted" });
  }

  async updateAccount(req: Request, res: Response) {
    const cpf = req.get('cpf');

    const { name, newCpf } = req.body;

    await this.accountService.updateAccount({ cpf: cpf as string, name, newCpf });

    return res.json({ msg: "Account updated" });
  }



}