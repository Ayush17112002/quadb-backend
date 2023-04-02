const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const execute = async (query) => {
  try {
    await client.connect();
    await client.query(query);
    return true;
  } catch (err) {
    console.log("Error in connecting");
    return false;
  }
};

const text = `CREATE TABLE IF NOT EXISTS "stocks"(
    "name" VARCHAR(255) NOT NULL,
    "buy" VARCHAR(255) NOT NULL,
    "sell" VARCHAR(255) NOT NULL,
    "last" VARCHAR(255) NOT NULL,
    "volume" VARCHAR(255) NOT NULL,
    "base_unit" VARCHAR(255) NOT NULL,
    PRIMARY KEY (base_unit)
)`;

execute(text)
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = client;
