import connection from "../dbStrategy/postgres.js";
import {catSchema} from "../schemas/schemas.js";

export async function getCategories(req, res) {
    let limit = 1000000000;
    let offset = 0;

    if (req.query.limit) {
        limit = req.query.limit
    }

    if (req.query.offset) {
        offset = req.query.offset
    }

    const { rows: categoriesList } = await connection.query(`SELECT * FROM categories LIMIT ${limit} OFFSET ${offset}`)
    return res.status(200).send(categoriesList)
}

export async function registerCategory(req, res) {
    const newCategory = req.body;

    const validation = catSchema.validate(newCategory);

    if (validation.error) {
        console.log(validation.error.details)        
      return res.status(400).send(`${validation.error}`)  
    }

    const { rows: verifyExistingCategory } = await connection.query(`SELECT * FROM categories WHERE name='${newCategory.name}'`)

    if (verifyExistingCategory.length > 0) {
        return res.status(409).send(`A categoria informada já existe`)  
    }

    await connection.query(`INSERT INTO categories (name) VALUES ('${newCategory.name}')`);
    return res.sendStatus(201)
}