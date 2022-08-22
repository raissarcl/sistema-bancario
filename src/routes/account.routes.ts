import express from 'express';
import { validateAccountRequest } from '../middlewares/validateCpf';
import { body } from 'express-validator';
import { AccountController } from '../controllers/account.controller';
import { container } from 'tsyringe';

const accountController = container.resolve(AccountController);

export const userRoutes = express.Router();

// const validations = [
//   body("name").isString(),
//   body("cpf").ma
// ];


//Create Bank Account
userRoutes.post('/', (req, res) => {
  return accountController.createAccount(req, res);
});

userRoutes.get('/:account', validateAccountRequest, (req, res) => {
  return accountController.getAccount(req, res);
});

userRoutes.get('/all', (req, res) => {
  return accountController.getAllAccounts(req, res);
});
