import { body } from "express-validator";

export const storeCostumerSchema = [
    body('name').exists({ checkFalsy: true }).withMessage('O campo nome é obrigatório'),
    body('surname').exists({ checkFalsy: true }).withMessage('O campo sobrenome é um campo obrigatório'),
    body('email').isEmail().withMessage('Insira um email válido'),
    body('password').isStrongPassword({ minLength: 8, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 8 caracteres'),
    body('password').isStrongPassword({ minLength: 0, minLowercase: 1, minNumbers: 0, minSymbols: 0, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 1 letra maiúscula'),
    body('password').isStrongPassword({ minLength: 0, minLowercase: 0, minNumbers: 1, minSymbols: 0, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 1 número'),
    body('password').isStrongPassword({ minLength: 0, minLowercase: 0, minNumbers: 0, minSymbols: 1, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 1 carectere especial'),
    body('password').isStrongPassword({ minLength: 0, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 1 }).withMessage('A senha deve ter pelomenos 1 letra minúscula'),
    
];

export const updateCostumerSchema = [
    body('name').exists({ checkFalsy: true }).withMessage('O campo nome é obrigatório'),
    body('surname').exists({ checkFalsy: true }).withMessage('O campo sobrenome é um campo obrigatório'),
    body('email').isEmail().withMessage('Insira um email válido'),
    // body('password').isStrongPassword({ minLength: 8, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 8 caracteres'),
    // body('password').isStrongPassword({ minLength: 0, minLowercase: 1, minNumbers: 0, minSymbols: 0, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 1 letra maiúscula'),
    // body('password').isStrongPassword({ minLength: 0, minLowercase: 0, minNumbers: 1, minSymbols: 0, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 1 número'),
    // body('password').isStrongPassword({ minLength: 0, minLowercase: 0, minNumbers: 0, minSymbols: 1, minUppercase: 0 }).withMessage('A senha deve ter pelomenos 1 carectere especial'),
    // body('password').isStrongPassword({ minLength: 0, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 1 }).withMessage('A senha deve ter pelomenos 1 letra minúscula'),
    
];