import express from 'express';
import { validateAccountRequest } from '../middlewares/authenticateAccountRequest';
import { validate } from '../middlewares/validations';
import { body, header, param, validationResult } from 'express-validator';
import { AccountController } from '../controllers/account.controller';
import { container } from 'tsyringe';

const accountController = container.resolve(AccountController);

export const userRoutes = express.Router();

const validationCpfBody = body("cpf").notEmpty().isString().matches(/^\d{11}$/).withMessage("Should be an 11 characters string");
const validationCpfHeader = header("cpf").isString().matches(/^\d{11}$/).withMessage("Should be 11 an characters string");
const validationToAccountCpfBody = body("toAccountCpf").isString().matches(/^\d{11}$/).withMessage("Should be an 11 characters string");
const validationNewCpfBody = body("newCpf").optional().isString().matches(/^\d{11}$/).withMessage("Should be an 11 characters string");
const validationNameBody = body("name").notEmpty().isString().withMessage("Name is required");
const validationNewNameBody = body("newName").optional().isString();
const validationvalueBody = body("value").toFloat().isFloat({ gt: 0 }).withMessage("Value should be greater than 0");
const validationIdParam = param("id").isString();


userRoutes.post('/',
  validate([validationCpfBody, validationNameBody]),
  (req, res) => {
    return accountController.createAccount(req, res);
  });

userRoutes.get('/',
  validate([validationCpfHeader]),
  validateAccountRequest,
  (req, res) => {
    return accountController.getAllAccounts(req, res);
  });

userRoutes.delete('/',
  validate([validationCpfHeader]),
  validateAccountRequest,
  (req, res) => {
    return accountController.deleteAccount(req, res);
  });

userRoutes.patch('/',
  validate([validationCpfHeader, validationNewCpfBody, validationNewNameBody]),
  validateAccountRequest,
  (req, res) => {
    return accountController.updateAccount(req, res);
  });

userRoutes.get('/:id',
  validate([validationCpfHeader, validationIdParam]),
  validateAccountRequest,
  (req, res) => {
    return accountController.getAccount(req, res);
  });

userRoutes.post('/deposit',
  validate([validationCpfHeader, validationvalueBody]),
  validateAccountRequest,
  (req, res) => {
    return accountController.depositMoney(req, res);
  });

userRoutes.post('/withdraw',
  validate([validationCpfHeader, validationvalueBody]),
  validateAccountRequest,
  (req, res) => {
    return accountController.withdrawMoney(req, res);
  });

userRoutes.post('/transfer',
  validate([validationToAccountCpfBody, validationvalueBody]),
  validateAccountRequest,
  (req, res) => {
    return accountController.transferMoney(req, res);
  });
