import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import gameRouter from "./routes/gamesRoutes.js";
import categoriesRouter from "./routes/categoryRoutes.js";
import customersRouter from "./routes/customerRoutes.js";
import rentalsRouter from "./routes/rentalsRoutes.js";

const server = express();

dotenv.config();

server.use(
    express.urlencoded({
        extended: true,
    }),
    express.json(), cors()
);

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

server.use(gameRouter, categoriesRouter, customersRouter, rentalsRouter);

const PORT = process.env.PORT || 5010

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`))