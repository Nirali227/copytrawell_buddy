const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  database: process.env.PG_DATABASE,
  port: 5432,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  ssl: false,
});

module.exports = pool;
