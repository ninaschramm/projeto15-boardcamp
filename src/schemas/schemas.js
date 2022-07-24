import joi from "joi";

const catSchema = joi.object({
    name: joi.string().required().messages({
        'string.empty': "O campo não pode estar em branco!",
        'any.required': "O campo não pode estar em branco!",}),
})

const gameSchema = joi.object({
    name: joi.string().required().messages({
        'string.empty': "O campo não pode estar em branco!",
        'any.required': "O campo não pode estar em branco!",}),
    stockTotal: joi.number().min(1).required().messages({
        'number.min': "O estoque deve ser maior que zero",}),
    pricePerDay: joi.number().min(1).required().messages({
        'number.min': "O preço deve ser maior que zero",}),
    image: joi.string(),
    categoryId: joi.number().required(),
})

const customerSchema = joi.object({
    name: joi.string().required().messages({
        'string.empty': 'O campo "nome" não pode estar em branco!',
        'any.required': 'O campo "nome" não pode estar em branco!',}),
    phone: joi.string().min(10).max(11).required().messages({
        'string.min': "O número de telefone deve ter entre 10 e 11 dígitos",
        'string.max': "O número de telefone deve ter entre 10 e 11 dígitos",}),
    cpf: joi.string().min(11).max(11).required().messages({
        'string.min': "Digite um número de CPF válido",
        'string.max': "Digite um número de CPF válido",}),
    birthday: joi.date().required().messages({        
        'any.required': 'O campo "aniversário" não pode estar em branco!'}),
})

const rentalsSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    rentDate: joi.date().required(),
    daysRented: joi.number().min(1).required().messages({        
        'number.min': 'O número de dias deve ser maior que 0.'}),
    returnDate: joi.any(),
    originalPrice: joi.number(),
    delayFee: joi.any(),
})

export {catSchema, gameSchema, customerSchema, rentalsSchema}