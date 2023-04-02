const client = require("../database/connect");

const getData = async (req, res) => {
  try {
    const { baseunit } = req.query;
    let query;
    if (baseunit) {
      console.log(baseunit, typeof baseunit);
      query = {
        text: `SELECT * FROM ${process.env.DB_TABLENAME} WHERE baseunit = $1`,
        values: [baseunit],
      };
    } else {
      query = `SELECT * FROM ${process.env.DB_TABLENAME}`;
    }
    console.log(query);
    const result = await client.query(query);
    console.log(result.rows);
    return res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(400).json("unsucess");
  }
};
module.exports = { getData };
