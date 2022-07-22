import connection from "../dbStrategy/postgres.js";
import joi from "joi";

export async function getGames(req, res) {
    const { rows: gameList } = await connection.query(`SELECT * FROM games`)

    return res.status(200).send(gameList)
}

export async function registerGame() {
    console.log("OK")
}