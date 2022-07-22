import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

const server = express();
const { Pool } = pg;

dotenv.config();

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

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

// server.use();

const PORT = process.env.PORT || 5010

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`))