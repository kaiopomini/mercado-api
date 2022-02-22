import { body } from "express-validator";

export const storeProductSchema = [
    body('name').exists({ checkFalsy: true }).withMessage('O campo nome é obrigatório'),
    body('price').isNumeric().withMessage('Informe um preço válido'),
    body('price')
        .custom( value => {
            if (value <= 0) {
                throw new Error('valor negativo');
              }
              return true;
        })
        .withMessage('Informe um preço válido'),
    body('gtin_code').exists({checkFalsy: true}).withMessage('O campo codigo é obrigatório'),
    body('base_price').isNumeric().withMessage('Informe um preço válido'),
    body('base_price')
        .custom( value => {
            if (value <= 0) {
                throw new Error('valor negativo');
              }
              return true;
        })
        .withMessage('Informe um preço válido'), 
];