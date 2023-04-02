const axios = require("axios");
const client = require("../database/connect");

const postData = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const data = response.data;

    //STORE DATA INTO DB
    let len = 10;
    for (const prop in data) {
      const row = data[prop];
      console.log(row);
      const query = {
        text: `
        INSERT INTO ${process.env.DB_TABLENAME} ("name", "buy", "sell", "volume", "last", "baseunit") 
        VALUES($1, $2, $3, $4, $5, $6)`,
        values: [
          row["name"],
          row["buy"],
          row["sell"],
          row["volume"],
          row["last"],
          row["base_unit"],
        ],
      };
      const result = await client.query(query);

      console.log("success insertion");
      if (--len == 0) break;
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { postData };
