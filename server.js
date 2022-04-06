const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
<<<<<<< HEAD
var corsOptions = { // only allows the AWS S3 static website and locally hosted instances of the front end to access the backend
  origin: ["http://jds7232-angular-front-end.s3-website-us-east-1.amazonaws.com","https://localhost:8081"]
=======
var corsOptions = {
  origin: ["http://jds7232-angular-front-end.s3-website-us-east-1.amazonaws.com","http://localhost:8081"]
>>>>>>> aaceca936ef12da384ff618b1b210fc9dd93b27d
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// this page isn't important as no human user other than devs can see it
app.get("/", (req, res) => {
  res.send("why are u here");
});
require("./app/routes/event.routes")(app);
// binding to port 8080 in the case of local testing
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
