import { body } from "express-validator";

export const storeUserSchema = [
    body('name').exists({ checkFalsy: true }).withMessage('O campo nome é obrigatório'),
    body('surname').exists({ checkFalsy: true }).withMessage('O campo sobrenome é um campo obrigatório'),
    body('email').isEmail().withMessage('Insira um email válido'),
    body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }).withMessage('A senha deve ter pelomenos 8 caracteres dos quais devem ter pelomenos um carectere especial, letra maiúscula, letra minúscula e número')
];