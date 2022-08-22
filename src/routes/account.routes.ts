import express from 'express';
import { validateAccountRequest } from '../middlewares/validateAccountRequest';
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

userRoutes.get('/', validateAccountRequest, (req, res) => {
  return accountController.getAllAccounts(req, res);
});

userRoutes.get('/:id', validateAccountRequest, (req, res) => {
  return accountController.getAccount(req, res);
});

userRoutes.post('/deposit', validateAccountRequest, (req, res) => {
  return accountController.depositMoney(req, res);
});

userRoutes.post('/withdraw', validateAccountRequest, (req, res) => {
  return accountController.withdrawMoney(req, res);
});

userRoutes.post('/transfer', validateAccountRequest, (req, res) => {
  return accountController.transferMoney(req, res);
});

userRoutes.post('/update', validateAccountRequest, (req, res) => {
  return accountController.updateAccount(req, res);
})