import connection from "../dbStrategy/postgres.js";
import { gameSchema } from "../schemas/schemas.js";

export async function getGames(req, res) {
    let limit = 1000000000;
    let offset = 0;
    const gameName = req.query.name;

    if (req.query.limit) {
        limit = req.query.limit
    }

    if (req.query.offset) {
        offset = req.query.offset
    }
   
    if (gameName) {
        const { rows: gameList } = await connection.query(`
        SELECT *, categories.name as "categoryName", games.name as "name", games.id as "id" FROM games
        JOIN categories
        ON games."categoryId" = categories.id
        WHERE LOWER(games.name) LIKE LOWER('${gameName}%')`)
    
        return res.status(200).send(gameList)
    }

    const { rows: gameList } = await connection.query(`
    SELECT *, categories.name as "categoryName", games.name as "name", games.id as "id" FROM games
    JOIN categories
    ON games."categoryId" = categories.id
    LIMIT ${limit} OFFSET ${offset}`)

    return res.status(200).send(gameList)
}

export async function registerGame(req, res) {
    const newGame = req.body;

    const validation = gameSchema.validate(newGame);

    if (validation.error) {
        console.log(validation.error.details)        
      return res.status(400).send(`${validation.error}`)  
    }

    const { rows: verifyExistingCategory } = await connection.query(`SELECT * FROM categories WHERE id='${newGame.categoryId}'`)

    if (verifyExistingCategory.length === 0) {
        return res.status(400).send(`A categoria informada não existe`)  
    }

    const { rows: verifyExistingGame } = await connection.query(`SELECT * FROM games WHERE name='${newGame.name}'`)

    if (verifyExistingGame.length > 0) {
        return res.status(409).send(`O jogo informado já está cadastrado`)  
    }

    await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${newGame.name}', '${newGame.image}', '${newGame.stockTotal}', '${newGame.categoryId}', '${newGame.pricePerDay}')`);
    return res.sendStatus(201)
}