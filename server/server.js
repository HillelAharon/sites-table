const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express_graphql = require("express-graphql");
const schema = require("./graphQL/");
const app = express();

const DB_URL = "mongodb://localhost:27017/gantzi";
const PORT = 4000;

mongoose
  .connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//app.use(cors());
app.use(
  "/graphql",
  bodyParser.json(),
  express_graphql({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`running on port 4000`));
