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



export {catSchema, gameSchema}