const {Pool} = require("pg");
const path = require("path");

require("dotenv").config({
    override:true,
    path: path.join(__dirname,"dev.env")
});

const baseconnect = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
}

const pool = new Pool(baseconnect);


module.exports = pool;