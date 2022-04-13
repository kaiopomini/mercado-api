import { body } from "express-validator";
import {
  validadeCPF,
  validatePhone,
  validatePhoneDDI,
} from "../../utils/validations";

export const storeCustomerSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O campo nome é obrigatório"),
  body("surname")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O campo sobrenome é um campo obrigatório"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .withMessage("Insira um email válido"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("A senha deve ter pelomenos 8 caracteres")
    .isStrongPassword({
      minLength: 0,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 1,
    })
    .withMessage("A senha deve ter pelomenos 1 letra maiúscula")
    .isStrongPassword({
      minLength: 0,
      minLowercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("A senha deve ter pelomenos 1 número")
    .isStrongPassword({
      minLength: 0,
      minLowercase: 1,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("A senha deve ter pelomenos 1 letra minúscula"),
  body("phones")
    .isArray({ min: 1 })
    .withMessage("O campo Telefone/Whatsapp é obrigatório"),
  body("phones.*.phone_number")
    .custom((value) => (value ? validatePhone(value) : false))
    .withMessage("Informe um telefone/Whatsapp válido"),
  body("phones.*.id")
    .optional()
    .exists({ checkFalsy: true })
    .withMessage("informe um id válido"),
  body("phones.*.country_code")
    .optional()
    .custom((value) => (value ? validatePhoneDDI(value) : false))
    .withMessage("Infome um DDI válido"),
  body("phones.*.isPrimary").optional().isBoolean().withMessage(""),
  body("phones.*.is_whatsapp").optional().isBoolean().withMessage(""),

  body("address").isObject(),
  body("address.name")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O endereço é obrigatório"),
  body("address.city")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("A cidade é obrigatória"),
  body("address.federative_unity")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O estado é obrigatório"),
  body("address.zip_code")
    .exists({ checkFalsy: true })
    .withMessage("O CEP é obrigatório"),
  body("address.country")
    .optional()
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("Informe um país válido"),
];

export const updateCustomerSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O campo nome é obrigatório"),

  body("surname")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O campo sobrenome é um campo obrigatório"),

  body("cpf")
    .optional()
    .custom((value) => (value ? validadeCPF(value) : true))
    .withMessage("CPF inválido, informe um CPF válido."),

  body("birth_date").optional().exists({ checkFalsy: true }),

  body("phones")
    .isArray({ min: 1 })
    .withMessage("O campo Telefone/Whatsapp é obrigatório"),
  body("phones.*.phone_number")
    .custom((value) => (value ? validatePhone(value) : false))
    .withMessage("Informe um telefone/Whatsapp válido"),
  body("phones.*.id")
    .optional()
    .exists({ checkFalsy: true })
    .withMessage("informe um id válido"),
  body("phones.*.country_code")
    .optional()
    .custom((value) => (value ? validatePhoneDDI(value) : false))
    .withMessage("Infome um DDI válido"),
  body("phones.*.isPrimary").optional().isBoolean().withMessage(""),
  body("phones.*.is_whatsapp").optional().isBoolean().withMessage(""),

  body("address").isObject(),
  body("address.name")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O endereço é obrigatório"),
  body("address.city")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("A cidade é obrigatória"),
  body("address.federative_unity")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("O estado é obrigatório"),
  body("address.zip_code")
    .exists({ checkFalsy: true })
    .withMessage("O CEP é obrigatório"),
  body("address.country")
    .optional()
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("Informe um país válido"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .withMessage("Insira um email válido"),
  body("password")
    .optional()
    .exists({ checkFalsy: false })
    .isStrongPassword({
      minLength: 8,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("A senha deve ter pelomenos 8 caracteres")
    .isStrongPassword({
      minLength: 0,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 1,
    })
    .withMessage("A senha deve ter pelomenos 1 letra maiúscula")
    .isStrongPassword({
      minLength: 0,
      minLowercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("A senha deve ter pelomenos 1 número")
    .isStrongPassword({
      minLength: 0,
      minLowercase: 1,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("A senha deve ter pelomenos 1 letra minúscula"),
];

