import connection from "../dbStrategy/postgres.js";
import joi from "joi";

const catSchema = joi.object({
    name: joi.string().required().messages({
        'string.empty': "O campo não pode estar em branco!",
        'any.required': "O campo não pode estar em branco!",}),
})

export async function getCategories(req, res) {
    const { rows: categoriesList } = await connection.query(`SELECT * FROM categories`)

    return res.status(200).send(categoriesList)
}

export async function registerCategory(req, res) {
    const newCategory = req.body;
    console.log(newCategory)

    const validation = catSchema.validate(newCategory);

    if (validation.error) {
        console.log(validation.error.details)        
      return res.status(400).send(`${validation.error}`)  
    }

    const { rows: verifyExistingCategory } = await connection.query(`SELECT * FROM categories WHERE name='${newCategory.name}'`)

    if (verifyExistingCategory.length > 0) {
        console.log(verifyExistingCategory)
        return res.status(409).send(`A categoria informada já existe`)  
    }

    await connection.query(`INSERT INTO categories (name) VALUES ('${newCategory.name}')`);
    return res.sendStatus(201)
}