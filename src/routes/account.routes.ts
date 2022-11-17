import express from 'express';
import { validateAccountRequest } from '../middlewares/authenticateAccountRequest';
import { validate } from '../middlewares/validations';
import { AccountController } from '../controllers/account.controller';
import { container } from 'tsyringe';
import { validationCpfBody, validationIdParam, validationNameBody, validationNewCpfBody, validationNewNameBody, validationToAccountCpfBody, validationvalueBody } from './validations';

const accountController = container.resolve(AccountController);

export const userRoutes = express.Router();

userRoutes.post('/',
  validate([validationCpfBody, validationNameBody]),
  (req, res) => {
    return accountController.createAccount(req, res);
  });

userRoutes.post('/sessions', (req, res) => {
  return accountController.authenticateUser(req, res);
})

userRoutes.get('/',
  (req, res) => {
    return accountController.getAllAccounts(req, res);
  });

userRoutes.delete('/',
  validateAccountRequest,
  (req, res) => {
    return accountController.deleteAccount(req, res);
  });

userRoutes.patch('/',
  validateAccountRequest,
  validate([validationNewCpfBody, validationNewNameBody]),
  (req, res) => {
    return accountController.updateAccount(req, res);
  });

userRoutes.get('/:id',
  validateAccountRequest,
  validate([validationIdParam]),
  (req, res) => {
    return accountController.getAccount(req, res);
  });

userRoutes.post('/deposit',
  validateAccountRequest,
  validate([validationvalueBody]),
  (req, res) => {
    return accountController.depositMoney(req, res);
  });

userRoutes.post('/withdraw',
  validateAccountRequest,
  validate([validationvalueBody]),
  (req, res) => {
    return accountController.withdrawMoney(req, res);
  });

userRoutes.post('/transfer',
  validateAccountRequest,
  validate([validationToAccountCpfBody, validationvalueBody]),
  (req, res) => {
    return accountController.transferMoney(req, res);
  });
