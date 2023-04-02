require("dotenv").config({ path: "./.env" });

const app = require("express")();
const cors = require("cors");

app.use(cors({ origin: "*" }));

const client = require("./database/connect");

//FETCH AND STORE INTO DB
const { postData } = require("./controllers/post");

postData()
  .then(() => console.log("successful storing data into db"))
  .catch((err) => console.log("error in storing"));

//GET ROUTE
const { getData } = require("./controllers/get");
app.get("/", getData);

app.listen(process.env.PORT, (err) => {
  if (!err) console.log(`Server is running on port ${process.env.PORT}`);
});
