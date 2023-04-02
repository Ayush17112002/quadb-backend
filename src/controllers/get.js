const client = require("../database/connect");

const getData = async (req, res) => {
  try {
    const query = `SELECT * FROM ${process.env.DB_TABLENAME}`;
    const result = await client.query(query);
    console.log(result.rows);
    return res.status(200).send(result.rows);
  } catch (err) {
    console.log(err.message);
    return res.send("unsucess");
  }
};
module.exports = { getData };
