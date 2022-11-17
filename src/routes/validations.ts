import { body, header, param } from "express-validator";

const validationCpfBody = body("cpf").notEmpty().isString().matches(/^\d{11}$/).withMessage("Should be an 11 characters string");
const validationToAccountCpfBody = body("toAccountCpf").isString().matches(/^\d{11}$/).withMessage("Should be an 11 characters string");
const validationNewCpfBody = body("newCpf").optional().isString().matches(/^\d{11}$/).withMessage("Should be an 11 characters string");
const validationNameBody = body("name").notEmpty().isString().withMessage("Name is required");
const validationNewNameBody = body("newName").optional().isString();
const validationvalueBody = body("value").toFloat().isFloat({ gt: 0 }).withMessage("Value should be greater than 0");
const validationIdParam = param("id").isString();

export { validationCpfBody, validationIdParam, validationNameBody, validationNewCpfBody, validationNewNameBody, validationToAccountCpfBody, validationvalueBody };