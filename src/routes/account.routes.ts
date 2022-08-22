import express, { Request } from 'express';
import { validateAccountRequest } from '../middlewares/validateAccountRequest';
import { body, header, param, validationResult } from 'express-validator';
import { AccountController } from '../controllers/account.controller';
import { container } from 'tsyringe';
import { Response } from 'express-serve-static-core';

const accountController = container.resolve(AccountController);

export const userRoutes = express.Router();

const validationCpfBody = body("cpf").notEmpty().isString().matches(/^\d{11}$/).withMessage("Should be 11 characters");
const validationCpfHeader = header("cpf").isString().matches(/^\d{11}$/).withMessage("Should be 11 characters");
const validationNameBody = body("name").notEmpty().isString().withMessage("Name is required");
const validationAmmountBody = body("ammount").toFloat();
const validationNewCpfBody = body("newCpf").isString().matches(/^\d{11}$/).withMessage("Should be 11 characters");
const validationNewNameBody = body("newName").isString();
const validationIdParam = param("id").isString();
const validationToAccountCpfBody = body("toAccountCpf").isString().matches(/^\d{11}$/).withMessage("Should be 11 characters");

userRoutes.post('/',
  [validationCpfBody, validationNameBody],
  (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.createAccount(req, res);
  });

userRoutes.get('/',
  validationCpfHeader,
  validateAccountRequest,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.getAllAccounts(req, res);
  });

userRoutes.delete('/',
  validationCpfHeader,
  validateAccountRequest,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.deleteAccount(req, res);
  });

userRoutes.patch('/',
  [validationCpfHeader, validationNewCpfBody, validationNewNameBody],
  validateAccountRequest,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.updateAccount(req, res);
  });

userRoutes.get('/:id',
  [validationCpfHeader, validationIdParam],
  validateAccountRequest,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.getAccount(req, res);
  });

userRoutes.post('/deposit',
  [validationCpfHeader, validationAmmountBody],
  validateAccountRequest,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.depositMoney(req, res);
  });

userRoutes.post('/withdraw',
  [validationCpfHeader, validationAmmountBody],
  validateAccountRequest,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.withdrawMoney(req, res);
  });

userRoutes.post('/transfer',
  [validationToAccountCpfBody, validationAmmountBody],
  validateAccountRequest,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return accountController.transferMoney(req, res);
  });
